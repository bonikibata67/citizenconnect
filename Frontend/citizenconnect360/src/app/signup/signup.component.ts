import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { authActions } from '../state/actions/auth.actions';
import { AppState } from '../state/reducers/auth.reducers';
import { selectAuthError, selectAuthLoading } from '../state/selectors/auth.selector';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUpForm!: FormGroup;
  error$: Observable<string | null>;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.error$ = this.store.select(selectAuthError);
    this.loading$ = this.store.select(selectAuthLoading);
  }

  ngOnInit(): void {
    console.log('Initializing SignupComponent...');

    this.SignUpForm = this.fb.group({
      Username: [null, [Validators.required, Validators.minLength(3)]],
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required, Validators.minLength(6)]],
      Role: ['citizen', Validators.required]
    });

    console.log('SignUpForm initialized with controls:', this.SignUpForm.controls);
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      const formValue = this.SignUpForm.value;
      const roleId = this.getRoleId(formValue.Role);
      const payload = {
        ...formValue,
        RoleID: roleId
      };
      delete payload.Role; // Remove Role if not needed

      // Dispatch register action
      this.store.dispatch(authActions.register({ user: payload }));

      // Redirect after successful registration
      this.loading$.pipe(
        filter(loading => !loading), // Wait for loading to finish
        switchMap(() => this.error$), // Get the error state after loading is complete
        tap(error => {
          if (!error) {
            // Redirect to home page if no error
            this.router.navigate(['/home']);
          }
        })
      ).subscribe();
    }
  }

  private getRoleId(role: string): number {
    switch (role) {
      case 'citizen':
        return 1;
      case 'government official':
        return 2;
      case 'admin':
        return 3;
      default:
        throw new Error('Unknown role: ' + role);
    }
  }
}
