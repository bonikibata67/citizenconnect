import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/auth';
import * as fromAdmin from '../state/reducers/admin.reducers';
import * as AdminActions from '../state/actions/admin.actions';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Corrected from styleUrl to styleUrls
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;
  usernameToDelete: string = '';
  emailToDelete: string = '';
  roleToDelete: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.authService.getUsers().subscribe({
        
      next: (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  deleteUser(): void {
    if (this.usernameToDelete && this.emailToDelete && this.roleToDelete) {
      this.authService.deleteUser(this.usernameToDelete, this.emailToDelete, this.roleToDelete).subscribe({
        next: (response) => {
          if (response.success) {
            this.message = 'User deleted successfully';
            this.fetchUsers(); // Refresh user list
          } else {
            this.message = 'Failed to delete user';
          }
        },
        error: (err) => {
          this.message = 'Failed to delete user';
        }
      });
    } else {
      this.message = 'Please provide all fields to delete a user';
    }
  }
}

