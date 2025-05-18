import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router){}
  loginForm!: FormGroup;
  ngOnInit() {
      this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  
  }
  errorMessage = '';

  

  
    
  onSubmit(){
    console.log('clicked', this.loginForm.getRawValue());
    const { username, password } = this.loginForm.value;
    if (!username || !password)return;
    this.auth.login({username, password}).subscribe({
      next: () => {this.router.navigate(['']).then(()=> window.location.reload()),console.log('loggedIn')},
      error: () => this.errorMessage = 'Invalid credentisals'
    })
  }
}
