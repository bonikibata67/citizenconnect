import { createAction, props } from '@ngrx/store';
import { User } from '../../models/auth';

// Fetch Users
export const fetchUsers = createAction('[Admin] Fetch Users');
export const fetchUsersSuccess = createAction('[Admin] Fetch Users Success', props<{ users: User[] }>());
export const fetchUsersFailure = createAction('[Admin] Fetch Users Failure', props<{ error: string }>());

// Delete User
export const deleteUser = createAction('[Admin] Delete User', props<{ username: string, email: string, role: string }>());
export const deleteUserSuccess = createAction('[Admin] Delete User Success', props<{ username: string }>());
export const deleteUserFailure = createAction('[Admin] Delete User Failure', props<{ error: string }>());
