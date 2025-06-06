import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntryService } from '../../services/entry.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-entry-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {
    entryForm !: FormGroup;
    
    ngOnInit(){
      this.loadEntries();
      const a = localStorage.getItem('access_token')
    this.entryForm = this.fb.group({
      title: ['', Validators.required],
      mood: ['',Validators.required],
    });}
    successMessage = '';
    errorMessage = '';

    constructor(private fb:FormBuilder, private entryService: EntryService, private auth: AuthService){}

    onSubmit(){
      
      if (this.entryForm.valid){
        this.entryService.createEntries(this.entryForm.value).subscribe({
          next: ()=> {this.successMessage = 'Added', this.ngOnInit(), this.errorMessage = ''},
          error: ()=> {this.errorMessage = 'Someting went wrong', this.successMessage=''}
        })
      }
    }

    entries: any[] = [];
    loadEntries(){
      this.entryService.getEntries().subscribe({
        next: (res: any)=> { this.entries = res},
        error: err =>{
        }
        // 
      })
    }

    onDelete(id:number){
      this.entryService.deleteEntry(id).subscribe(
        ()=>{
          this.entries = this.entries.filter(e => e.id !== id)
        }
      )
    }
}
