import { Component, OnInit } from '@angular/core';
import { Incident } from '../models/incedence';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../services/incident.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
// export class IncidentsComponent {

// }
export class IncidentsComponent  implements OnInit {
  incidents: Incident[] = [ 
    {
    title: 'Lorem Ipsum Incident',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    title: 'Another Incident',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    imageUrl: 'https://via.placeholder.com/150'
  }];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.incidentService.getIncidents().subscribe(incidents => {
      this.incidents = incidents;
    });
  }
}
