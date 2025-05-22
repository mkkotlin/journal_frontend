import { Component } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { JournalListService } from '../../services/journal-list.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-view',
  imports: [CommonModule],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  // book: any ={}
  error: string =''
  constructor(private entryService:EntryService, private journalService: JournalListService){}

  entry: any[]=[]
  mood: any[]=[]
  ngOnInit(){
// this for only single value 
    // forkJoin({
    //   mood: this.entryService.getEntries(),
    //   content: this.journalService.getJournal()
    // }).subscribe({
    //   next: (res)=>{
    //     this.book = {
    //       title: res.content[res.content.length-1].title,
    //       content:res.content[res.content.length-1].content,
    //       date: res.content[res.content.length-1].created_at,
    //       mood:res.mood[res.mood.length-1].mood
    //     }
    //   , console.log(this.book,res);
    //   }, error: (err)=>{this.error = 'Failed', console.log(this.error)}
    // })

    forkJoin({
      mood: this.entryService.getEntries(),
      entry: this.journalService.getJournal()
    }).subscribe({
      next: (res)=>{
        this.mood = res.mood;
        this.entry = res.entry;
        console.log(res.entry)
      }, error: (err) => {
        this.error = 'Failed';
      }
    })
  }

}
