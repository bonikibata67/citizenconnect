import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  adduser,
  loginresponse,
  loginuser,
  registerresponse,
  User,
} from '../models/auth';
import { catchError, Observable, of, tap } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:4000/auth/';

  constructor(private http: HttpClient,private router: Router) {}
  
  loginUsers(user: { Username: string, Password: string }): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.BASE_URL}login`, user).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of({
          token: '',
          message: error.error.message || 'Login failed',
        });
      })
    );
  }

  registerUser(newUser: adduser): Observable<registerresponse> {
    console.log(newUser);
    return this.http
      .post<registerresponse>(`${this.BASE_URL}register`, newUser)
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
        }),
       
      );
  }

  
  // Check if the user is an admin
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role === 'admin';
    }
    return false;
  }

  // Check if the user is in government role
  isGovernment(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role === 'government';
    }
    return false;
  }

  // Decode JWT token (assuming JWT token structure has 'role' field)
  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = atob(parts[1]);
      return JSON.parse(payload);
    }
    return null;
  }

  // Log out the user and clear token
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role;
    }
    return null;
  }
  isCitizen(): boolean {
    return this.getUserRole() === 'citizen';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}users`);
  }

  deleteUser(
    username: string,
    email: string,
    role: string
  ): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.BASE_URL}deleteUser`, {
      username,
      email,
      role,
    });
  }
}
