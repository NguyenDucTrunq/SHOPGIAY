import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  userEmail: string | null = null;
  searchTerm: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to user email changes
    this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });

    // Get current search term from URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
    });
  }

  search() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchTerm.trim() }
      });
    } else {
      // If search is empty, remove search parameter
      this.router.navigate(['/products'], {
        queryParams: {}
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}