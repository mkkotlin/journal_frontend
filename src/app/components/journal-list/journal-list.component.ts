import { Component } from '@angular/core';
import { JournalListService } from '../../services/journal-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journal-list',
  imports: [CommonModule],
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.css'
})
export class JournalListComponent {
  constructor(private journalService: JournalListService, ){}

  journalList: any[] = []
  getList(){
    this.journalService.getJournal().subscribe({
      next: (res: any) => {this.journalList = res, console.log(this.journalList)},
      error: err => {console.log(err)}
    })
  }
  ngOnInit() {
    this.getList()
  }
}
