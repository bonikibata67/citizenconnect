import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { View } from '../models/view'; // Adjust path if necessary

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiUrl = 'http://localhost:4000/views'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getViews(): Observable<View[]> {
    return this.http.get<View[]>(this.apiUrl);
  }

  addView(view: Omit<View, 'id'>): Observable<View> {
    return this.http.post<View>(this.apiUrl, view);
  }
}
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ViewsService {

//   constructor() { }
// }
