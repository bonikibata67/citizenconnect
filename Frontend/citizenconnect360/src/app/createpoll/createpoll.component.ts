import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Poll} from '../models/polls';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-createpoll',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './createpoll.component.html',
  styleUrls: ['./createpoll.component.css']
})
export class CreatepollComponent implements OnInit {
  pollForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService,
    private router: Router
  ) {
    this.pollForm = this.formBuilder.group({
      title: ['', Validators.required],
      question: ['', Validators.required],
      options: this.formBuilder.array([this.createOption()])
    });
  }

  ngOnInit(): void {}

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      label: ['', Validators.required],
      percentage: [0],
      votes: [0]
    });
  }

  addPoll(): void {
    if (this.pollForm.valid) {
      const poll: Poll = {
        id: '', // Will be set by the backend
        title: this.pollForm.value.title,
        question: this.pollForm.value.question,
        options: this.pollForm.value.options.map((opt: any) => ({
          pollId: '', // Will be set by the backend
          label: opt.label,
          percentage: opt.percentage || 0,
          votes: opt.votes || 0
        })),
        totalVotes: this.pollForm.value.options.reduce((total: number, opt: any) => total + opt.votes, 0),
        creationTime: new Date().toISOString()
      };

      this.pollService.addPoll(poll).subscribe(() => {
        this.pollForm.reset();
        this.router.navigate(['/polls']); // Navigate to the polls page after adding poll
      });
    }
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }
}
