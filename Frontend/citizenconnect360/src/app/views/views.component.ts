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
    this.setLoggedInUser(); // Set logged-in user details
  }

  loadViews(): void {
    this.viewService.getViews().subscribe((views: View[]) => {
      this.views = views;
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
  
    const newView: View = {
      ...this.viewForm.getRawValue()
    };
  
    console.log('Submitting new view:', newView);
  
    this.viewService.addView(newView).subscribe(
      () => {
        console.log('View added successfully');
        this.loadViews(); // Reload views after adding a new one
        this.viewForm.reset(); // Clear the form
        this.setLoggedInUser(); // Reset the logged-in user details
      },
      error => {
        console.error('Error adding view:', error);
      }
    );
  }
}
