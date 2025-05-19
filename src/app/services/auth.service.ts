import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token'
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/';

  login(credentials: {username: string; password: string}){
    return this.http.post<any>(`${this.apiUrl}token/`, credentials).pipe(tap( res => {
      localStorage.setItem(this.tokenKey, res.access);
      console.log(res.access)
      this.isLoggedIn$.next(true);
    })
  );
  }

  getToken(){
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }
  isAuthenticated(){
    return this.isLoggedIn$.asObservable();
  }
  private hasToken(): boolean{
    return !! localStorage.getItem(this.tokenKey)
  }

  getProtectedData():Observable<any>{
    // return this.http.get('http://127.0.0.1:8000/api/test/', {withCredentials: true}) //works with cookies not localStorage
    const token = localStorage.getItem('access_token');
    if (!token){
      console.log('no token');
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('headers',headers)
    return this.http.get(`${this.apiUrl}test/`, {headers})
  }

  logOut(): void{
    localStorage.removeItem('access_token')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('access_token')
  }
}
