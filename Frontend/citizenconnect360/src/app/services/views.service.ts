import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { View } from '../models/view'; // Adjust path if necessary

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiUrl = 'http://localhost:4000/views';

  constructor(private http: HttpClient) {}

  getViews(): Observable<View[]> {
    return this.http.get<View[]>(this.apiUrl);
  }

  addView(view: View): Observable<View> {
    return this.http.post<View>(this.apiUrl, view);
  }
}