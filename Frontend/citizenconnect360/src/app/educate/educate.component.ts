import { Component } from '@angular/core';
import { PdfService } from '../services/pdf.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-educate',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './educate.component.html',
  styleUrl: './educate.component.css'
})
export class EducateComponent {

  userQuestion: string = '';
  messages: Message[] = [];

  constructor(private http: HttpClient, private pdfService: PdfService) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.pdfService.uploadPdf(file).subscribe(response => {
        console.log('PDF uploaded and processed:', response);
      }, error => {
        console.error('Error uploading PDF:', error);
      });
    }
  }

  sendQuestion(): void {
    if (this.userQuestion.trim()) {
      this.messages.push({ text: this.userQuestion, isUser: true });
      this.getChatResponse(this.userQuestion).subscribe(response => {
        this.messages.push({ text: response.answer, isUser: false });
      });
      this.userQuestion = '';
    }
  }

  getChatResponse(question: string): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/chat', { question });
  }
}
