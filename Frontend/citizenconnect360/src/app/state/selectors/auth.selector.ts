import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading // Make sure `loading` exists in `AuthState`
);
