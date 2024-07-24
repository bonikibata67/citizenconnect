import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../services/incident.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-incident',
  standalone: true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule, FormsModule  ],
  templateUrl: './report-incident.component.html',
  styleUrl: './report-incident.component.css'
})
export class ReportIncidentComponent {
  incidentTitle: string = '';
  incidentDescription: string = '';
  incidentMediaUrl: string = '';

  constructor(private incidentService: IncidentService) {}

  onSubmit() {
    const newIncident = {
      title: this.incidentTitle,
      description: this.incidentDescription,
      mediaUrl: this.incidentMediaUrl
    };
    this.incidentService.addIncident(newIncident);
    this.clearForm();
  }

  clearForm() {
    this.incidentTitle = '';
    this.incidentDescription = '';
    this.incidentMediaUrl = '';
  }
}
