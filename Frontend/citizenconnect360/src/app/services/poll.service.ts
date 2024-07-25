import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from '../models/polls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private pollsSubject: BehaviorSubject<Poll[]> = new BehaviorSubject<Poll[]>([]);
  public polls$: Observable<Poll[]> = this.pollsSubject.asObservable();

  private apiUrl = 'http://localhost:4000/api/polls';

  constructor(private http: HttpClient) {
    this.fetchPolls();
  }

  fetchPolls(): void {
    this.http.get<Poll[]>(this.apiUrl).subscribe(
      (polls) => {
        // Sort polls by creation time (assuming the API returns them in order or includes a timestamp)
        const sortedPolls = polls.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());
        this.pollsSubject.next(sortedPolls);
      },
      (error) => console.error('Error fetching polls:', error)
    );
  }

  addPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(this.apiUrl, poll);
  }

  deletePoll(pollId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pollId}`);
  }

  updatePoll(poll: Poll): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${poll.id}`, poll);
  }

  vote(pollId: string, optionLabel: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${pollId}/vote`, { label: optionLabel });
  }
}