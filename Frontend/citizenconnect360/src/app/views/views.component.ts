import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { View } from '../models/view'; 
import { ViewService } from '../services/views.service';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewComponent implements OnInit {
  views: View[] = [];
  viewForm: FormGroup;
  showAllViews = false;

  constructor(private viewService: ViewService, private fb: FormBuilder) {
    this.viewForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      location: [{ value: '', disabled: true }, Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      viewText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadViews();
    this.setLoggedInUser();
  }

  loadViews(): void {
    this.viewService.getViews().subscribe((views: View[]) => {
      this.views = views;
    });
  }

  toggleViews(): void {
    this.showAllViews = !this.showAllViews;
    const viewBoxes = document.querySelectorAll('.views-box');
    viewBoxes.forEach((viewBox, index) => {
      if (index >= 3) {
        viewBox.classList.toggle('hidden', !this.showAllViews);
      }
    });
  }

  setLoggedInUser(): void {
    const loggedInUser = {
      username: 'citizen1', // Example username, replace with actual data
      location: 'Nyeri, Kenya',
      role: 'Citizen'
    };
    this.viewForm.patchValue({
      username: loggedInUser.username,
      location: loggedInUser.location,
      role: loggedInUser.role
    });
  }

  addView(): void {
    if (this.viewForm.invalid) {
      console.log('Form is invalid:', this.viewForm);
      return;
    }

    // Transform the form data to match the backend's expected property names
    const formValue = this.viewForm.getRawValue();
    const newView: View = {
      Username: formValue.username,
      Location: formValue.location,
      Role: formValue.role,
      ViewText: formValue.viewText
    };

    console.log('Submitting new view:', newView);

    this.viewService.addView(newView).subscribe(
      () => {
        console.log('View added successfully');
        this.loadViews();
        this.viewForm.reset();
        this.setLoggedInUser();
      },
      error => {
        console.error('Error adding view:', error);
      }
    );
  }
}

