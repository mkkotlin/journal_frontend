import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/entry/';

  constructor(private http: HttpClient) { }

  getEntries():Observable<any>{
     const token = localStorage.getItem('access_token');
        if (!token){
          console.log('no token');
          return of(null);
        }
    
        
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.get(this.apiUrl, {headers})
  }

  createEntries(
    entry:{
      title: string;
      mood: string;
    }
  ):Observable<any>{
     const token = localStorage.getItem('access_token');
    
    return this.http.post(this.apiUrl,entry ,{headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })})
  }
}
