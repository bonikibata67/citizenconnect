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
  showAllPolls = false;

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.fetchPolls();
  }

  fetchPolls(): void {
    this.pollService.polls$.subscribe({
      next: (polls: Poll[]) => {
        this.polls = polls; // Load all polls
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
          this.fetchPolls(); // Refetch polls to get updated data
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
        this.fetchPolls(); // Refetch polls to get updated data
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

  togglePolls(): void {
    this.showAllPolls = !this.showAllPolls;
  }

  getDisplayedPolls(): Poll[] {
    return this.showAllPolls ? this.polls : this.polls.slice(0, 3);
  }
}
//   polls: Poll[] = [];

//   constructor(private pollService: PollService) {}

//   ngOnInit(): void {
//     this.pollService.polls$.subscribe({
//       next: (polls: Poll[]) => {
//         this.polls = polls.slice(0, 3); // Only take the first three polls
//       },
//       error: (err) => {
//         console.error('Failed to fetch polls', err);
//       }
//     });
//   }

//   vote(poll: Poll, selectedOption: PollOption): void {
//     if (selectedOption) {
//       this.pollService.vote(poll.id, selectedOption.label).subscribe({
//         next: () => {
//           this.pollService.fetchPolls(); // Refetch polls to get updated data
//         },
//         error: (err) => {
//           console.error('Failed to vote', err);
//         }
//       });
//     }
//   }

//   deletePoll(pollId: string): void {
//     this.pollService.deletePoll(pollId).subscribe({
//       next: () => {
//         this.polls = this.polls.filter(poll => poll.id !== pollId);
//         this.pollService.fetchPolls(); // Refetch polls to get updated data
//       },
//       error: (err) => {
//         console.error('Failed to delete poll', err);
//       }
//     });
//   }

//   getColor(optionLabel: string): string {
//     switch (optionLabel) {
//       case 'Yes':
//         return 'green';
//       case 'No':
//         return 'red';
//       case 'Not sure':
//         return 'yellow';
//       default:
//         return 'gray';
//     }
//   }

//   private fetchPolls(): void {
//     this.pollService.fetchPolls();
//   }
// }