import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../services/pdf.service';
import { HttpClient } from '@angular/common/http';


interface Message {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-aisummary',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './aisummary.component.html',
  styleUrl: './aisummary.component.css'
})

export class AisummaryComimplements implements OnInit {
  userQuestion: string = '';
  messages: Message[] = [];

  constructor(private http: HttpClient, private pdfService: PdfService, private incidentService: IncidentService) { }

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

 
  incidents: any[] = [];

  // constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.incidentService.getIncidents().subscribe(incidents => {
      this.incidents = incidents;
      // Call AI summarization function here if needed
      this.summarizeIncidents();
    });
  }

  summarizeIncidents(): void {
    // Implement AI summarization logic here if needed
    // Example: Update incident objects with AI summaries
    this.incidents.forEach(incident => {
      // Replace with actual AI summary generation logic
      incident.aiSummary = 'AI-generated summary for ' + incident.title;
    });
  }

}
