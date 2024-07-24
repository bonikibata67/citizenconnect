import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Poll,PollOption } from '../models/polls';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  polls: Poll[] = [];

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.pollService.polls$.subscribe({
      next: (polls: Poll[]) => {
        this.polls = polls;
      },
      error: (err) => {
        console.error('Failed to fetch polls', err);
      }
    });
  }

  vote(poll: Poll, selectedOption: PollOption): void {
    if (selectedOption) {
      this.pollService.vote(poll.id, selectedOption.label).subscribe({
        next: () => {
          this.fetchPolls();
        },
        error: (err) => {
          console.error('Failed to vote', err);
        }
      });
    }
  }

  deletePoll(pollId: string): void {
    this.pollService.deletePoll(pollId).subscribe({
      next: () => {
        this.polls = this.polls.filter(poll => poll.id !== pollId);
      },
      error: (err) => {
        console.error('Failed to delete poll', err);
      }
    });
  }

  getColor(optionLabel: string): string {
    switch (optionLabel) {
      case 'Yes':
        return 'green';
      case 'No':
        return 'red';
      case 'Not sure':
        return 'yellow';
      default:
        return 'gray';
    }
  }

  private fetchPolls(): void {
    this.pollService.fetchPolls();
  }
}
