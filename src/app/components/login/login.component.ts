import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
    loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  errorMessage = '';

  onSubmit(){
    console.log('clicked', this.loginForm.getRawValue())
  }
}
