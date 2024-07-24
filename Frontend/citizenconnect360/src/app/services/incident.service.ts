import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {  
  private incidentsSubject = new BehaviorSubject<any[]>([]);
  private incidents: any[] = [];

  constructor() {}

  getIncidents(): Observable<any[]> {
    return this.incidentsSubject.asObservable();
  }

  addIncident(incident: any) {
    this.incidents.push(incident);
    this.incidentsSubject.next([...this.incidents]);
  }

  // Method to retrieve incidents
  fetchIncidents(): void {
    // Simulate fetching from a backend API or other source
    this.incidents = [
      {
        title: 'Lorem Ipsum Incident',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        title: 'Another Incident',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
        imageUrl: 'https://via.placeholder.com/150'
      }
      // Add more incidents as needed
    ];

    this.incidentsSubject.next([...this.incidents]);
  }
}
