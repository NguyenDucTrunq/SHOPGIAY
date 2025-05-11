import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7053/api/Auth';
  private userEmailSubject = new BehaviorSubject<string>('');
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient) {
    // Kiểm tra localStorage khi khởi tạo service
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userEmailSubject.next(user.email);
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  setUser(user: User): void {
    if (user && user.email) {
      this.userEmailSubject.next(user.email);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout(): void {
    this.userEmailSubject.next('');
    localStorage.removeItem('user');
  }
}
