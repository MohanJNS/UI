import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    const hardcodedEmail = 'admin@gmail.com';
    const hardcodedPassword = '123456';

    if (this.loginForm.valid) {
      const enteredEmail = this.loginForm.value.email;
      const enteredPassword = this.loginForm.value.password;

      if (enteredEmail === hardcodedEmail && enteredPassword === hardcodedPassword) {
        console.log('Login successful');
        localStorage.setItem('isAuthenticated', 'true');
        this.authService.setAuthenticated(true);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Invalid email or password');
      }
    }
  }
}
