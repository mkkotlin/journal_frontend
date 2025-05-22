import { Component } from '@angular/core';
import { JournalListService } from '../../services/journal-list.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-journal-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
  fromDate: string = '';
toDate: string = '';
searchText: string='';

get filteredList() {
  const lowerSearch = this.searchText.toLowerCase();

  return this.journalList.filter(entry => {
    const matchText =
      entry.title.toLowerCase().includes(lowerSearch) ||
      entry.content.toLowerCase().includes(lowerSearch);

    const entryDate = new Date(entry.created_at);
    const from = this.fromDate ? new Date(this.fromDate): null;
    const to = this.toDate ? new Date(this.toDate): null;

    // if (from) from.setHours(0,0,0,0);
    // if (to) to.setHours(23,59,59,999)

    const matchDate =
      (!this.fromDate || entryDate >= new Date(this.fromDate)) &&
      (!this.toDate || entryDate <= new Date(this.toDate));

    return matchText && matchDate;
  });
}

clearFilter(){
  this.searchText ='';
  this.fromDate ='';
  this.toDate='';
}

toggleTheme(event:any){
  const isDark = event.target.checked;
  if (isDark){
    document.body.classList.add('dark-mode');
  }else{
    document.body.classList.remove('dark-mode')
  }
}

}
