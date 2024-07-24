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
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usernameToDelete: string = '';
  emailToDelete: string = '';
  roleToDelete: string = '';
  message: string = '';

  constructor(private store: Store<fromAdmin.AdminState>) {
    this.users$ = store.select(state => state.users);
    this.loading$ = store.select(state => state.loading);
    this.error$ = store.select(state => state.error);
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.fetchUsers());
  }

  deleteUser() {
    this.store.dispatch(AdminActions.deleteUser({ username: this.usernameToDelete, email: this.emailToDelete, role: this.roleToDelete }));
  }
}


