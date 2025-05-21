import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  responseData : string='';
  errorMsg = '';
  isLoggedIn = false;

  constructor( private auth: AuthService, private router:Router){}
  
  ngOnInit():void{
    this.isLoggedIn = this.auth.isLoggedIn();
    this.auth.getProtectedData().subscribe({
      next: (res:any) => {this.responseData = `Hello ${localStorage.getItem('username')} 😊`},
      error: (err: any) => this.errorMsg = 'Token Expired'      
    })
  }

  onLogout(): void{
    this.auth.logOut();
    this.ngOnInit();
    this.router.navigate(['/login'])
    localStorage.removeItem('username')
  }
  
}
