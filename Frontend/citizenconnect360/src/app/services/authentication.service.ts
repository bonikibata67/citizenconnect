// import { Injectable } from '@angular/core';
// import { User } from '../models/auth';
// import { HttpClient } from '@angular/common/http';
// import { adduser, loginresponse, loginuser, registerresponse} from '../models/auth';
// import {  Observable, of, tap } from 'rxjs';
// import { delay, } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   // constructor() { }
//   private users: User[] = [
//     { username: 'citizen1', password: 'password1', role: 'citizen' },
//     { username: 'official1', password: 'password2', role: 'government_official' },
//     { username: 'admin1', password: 'password3', role: 'admin' },
//   ];

//   constructor() {}

//   login(username: string, password: string): Observable<User | null> {
//     const authenticatedUser = this.users.find(
//       (user) => user.username === username && user.password === password
//     );

//     return of(authenticatedUser).pipe(delay(1000)); // Simulate API delay with delay operator
//   }
// }
