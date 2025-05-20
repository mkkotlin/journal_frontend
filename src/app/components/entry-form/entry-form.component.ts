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
      const a = localStorage.getItem('access_token')
      console.log(a)
    this.entryForm = this.fb.group({
      // user: [1,Validators.required],
      title: ['', Validators.required],
      mood: ['',Validators.required],
      // is_private: ['true']
    });}
    successMessage = '';

    constructor(private fb:FormBuilder, private entryService: EntryService, private auth: AuthService){}

    onSubmit(){
      
      if (this.entryForm.valid){
        this.entryService.createEntries(this.entryForm.value).subscribe({
          next: ()=> this.successMessage = 'Added',
          error: ()=> this.successMessage = 'error'
        })
      }
    }

    entries: any[] = [];
    loadEntries(){
      this.entryService.getEntries().subscribe({
        next: (res: any)=> { this.entries = res, console.log(res)},
        error: err =>{
          console.log(err)
        }
        
      })
    }
}
