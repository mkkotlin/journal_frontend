import { Component } from '@angular/core';
import { JournalListService } from '../../services/journal-list.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-journal-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.css'
})
export class JournalListComponent {
  constructor(private journalService: JournalListService, private fb: FormBuilder){}

  journalList: any[] = []
  getList(){
    this.journalService.getJournal().subscribe({
      next: (res: any) => {this.journalList = res},
      error: err => {console.log(err)}
    })
  }
  ngOnInit() {
    this.getList()
    this.crateEntry()
  }
  entryForm !: FormGroup;
  errorMessage = '';
  successMessage = '';
  crateEntry(){
    this.entryForm = this.fb.group({
      title: ['', Validators.required],
      content: ['',Validators.required]
    })
  }

  onSubmit(){
    if (this.entryForm.valid){
      this.journalService.createJournalEntry(this.entryForm.value).subscribe({
        next: ()=> {this.successMessage = 'Added', this.ngOnInit(), this.errorMessage = ''},
        error: ()=> {this.errorMessage = 'Someting went wrong', this.successMessage=''}
      })
    }
  }

  onDelete(id: number){
    this.journalService.deleteJournalEntry(id).subscribe(
      ()=>{
        this.journalList = this.journalList.filter( e => e.id !== id)
      }
    )
  }

}
