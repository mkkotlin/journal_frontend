import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalListService {

  private apiUrl = 'http://127.0.0.1:8000/api/journals/';
  constructor(private http: HttpClient) { }

  getJournal():Observable<any>{
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrl, {headers})
  }

  createJournalEntry(entry:{
    title: string;
    content: string;
  }):Observable<any>{
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.apiUrl, entry , {headers})
  }

}
