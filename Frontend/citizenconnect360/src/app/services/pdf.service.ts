import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  // constructor() { }

  private apiUrl = 'http://localhost:4000/api/upload-pdf'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  uploadPdf(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('pdf', file, file.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
}
