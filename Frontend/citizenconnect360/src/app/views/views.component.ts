import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { View } from '../models/view'; 
import { ViewService } from '../services/views.service';


@Component({
  selector: 'app-views',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  views: View[] = [];
  newView: string = '';

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.fetchViews();
  }

  fetchViews(): void {
    this.viewService.getViews().subscribe({
      next: (views) => this.views = views,
      error: (err) => console.error('Failed to fetch views', err)
    });
  }

  addView(): void {
    if (this.newView.trim()) {
      const newView: Omit<View, 'id'> = {
        username: 'current_user', // Replace with actual user info
        location: 'current_location', // Replace with actual user info
        role: 'current_role', // Replace with actual user info
        content: this.newView,
        createdAt: new Date().toISOString() // Set to current date for now
      };

      this.viewService.addView(newView).subscribe({
        next: () => {
          this.newView = '';
          this.fetchViews(); // Refresh the list after adding a new view
        },
        error: (err) => console.error('Failed to add view', err)
      });
    }
  }
}


// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-views',
//   standalone: true,
//   imports: [ RouterModule, CommonModule, FormsModule ],
//   templateUrl: './views.component.html',
//   styleUrl: './views.component.css'
// })
// export class ViewsComponent {
//   views: string[] = [
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
//   ];
//   newView: string = '';

//   addView() {
//     if (this.newView.trim()) {
//       this.views.push(this.newView);
//       this.newView = '';
//     }
//   }

// }
