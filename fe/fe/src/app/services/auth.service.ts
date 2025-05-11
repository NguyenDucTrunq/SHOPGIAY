import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, ApiResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7053/api/Auth';
  private userEmailSubject = new BehaviorSubject<string>('');
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, user);
  }

  login(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/login`, user);
  }

  setUser(response: ApiResponse<User>): void {
    if (response.data) {
      this.userEmailSubject.next(response.data.email);
      // Lưu thông tin user vào localStorage nếu cần
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  }

  logout(): void {
    this.userEmailSubject.next('');
    localStorage.removeItem('user');
  }
}
