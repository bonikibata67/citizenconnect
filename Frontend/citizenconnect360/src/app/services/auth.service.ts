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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:4000/auth/';

  constructor(private http: HttpClient) {}
  loginUsers(user: loginuser): Observable<loginresponse> {
    console.log(user);    
    return this.http.post<loginresponse>(`${this.BASE_URL}login`, user).pipe(
        tap((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
            }
        }),
        catchError((error: HttpErrorResponse) => {
            console.error('Login error:', error);
            return of({
                token: '',
                user: null,
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
        // catchError((error) => {
        //   console.error('Error during registration:', error);
        //   return of({
        //     token: '',
        //     user: { id: 0, username: '', email: '', password: '', role: '' },
        //     message: error.message,
        //   });
        // })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

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

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isGovernment(): boolean {
    return this.getUserRole() === 'government';
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
