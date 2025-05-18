import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  responseData = '';
  errorMsg = '';

  constructor( private auth: AuthService){}
  ngOnInit():void{
    this.auth.getProtectedData().subscribe({
      next: (res:any) => {this.responseData = JSON.stringify(res), console.log(JSON.stringify(res))},
      error: (err: any) => this.errorMsg = 'Token expired'      
    })
  }

  onLogout(): void{
    this.auth.logOut();
    console.log("logged out")
  }
  
}
