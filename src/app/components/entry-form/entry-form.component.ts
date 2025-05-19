import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntryService } from '../../services/entry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {
    entryForm !: FormGroup;
    
    ngOnInit(){
    this.entryForm = this.fb.group({
      title: ['', Validators.required],
      mood: ['',Validators.required],
      is_private: ['true']
    });}
    successMessage = '';

    constructor(private fb:FormBuilder, private entryService: EntryService){}

    onSubmit(){
      if (this.entryForm.valid){
        this.entryService.createEntries(this.entryForm.value).subscribe({
          next: ()=> this.successMessage = 'Added',
          error: ()=> this.successMessage = 'error'
        })
      }
    }
}
