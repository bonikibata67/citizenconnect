import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/auth';
import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
  users: User[];
  error: string | null;
  loading: boolean;
}

export const initialState: AdminState = {
  users: [],
  error: null,
  loading: false,
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.fetchUsers, state => ({ ...state, loading: true })),
  on(AdminActions.fetchUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(AdminActions.fetchUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AdminActions.deleteUser, state => ({ ...state, loading: true })),
  on(AdminActions.deleteUserSuccess, (state, { username }) => ({
    ...state,
    users: state.users.filter(user => user.Username !== username),
    loading: false,
  })),
  on(AdminActions.deleteUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
