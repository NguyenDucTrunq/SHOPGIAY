import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (user) => {
          if (user && user.email) {
            this.authService.setUser(user);
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Đăng nhập thất bại';
          }
        },
        error: (error) => {
          this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
        }
      });
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
    }
  }
}