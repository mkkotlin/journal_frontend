import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/entry/';

  getToken(){
    const token = localStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  constructor(private http: HttpClient) { }

  getEntries():Observable<any>{
    console.log(this.getToken())
    return this.http.get(this.apiUrl, {headers:this.getToken()})
  }
}
