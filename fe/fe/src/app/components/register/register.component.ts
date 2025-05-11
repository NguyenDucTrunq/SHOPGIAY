import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit() {
    const { confirmPassword, ...userData } = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Đăng ký thất bại';
      }
    });
  }
} 