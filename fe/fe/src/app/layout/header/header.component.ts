import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userEmail$.subscribe((email: string) => {
      this.userEmail = email;
    });
  }

  logout() {
    this.authService.logout();
  }
} 