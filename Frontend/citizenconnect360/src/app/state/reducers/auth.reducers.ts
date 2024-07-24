import { createReducer, on } from '@ngrx/store';
import { authActions } from "../actions/auth.actions";
import { User } from '../../models/auth';

export interface AuthState {  
  users: User[];
  error: string | null;
  message: string | null;
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  
}

export interface AppState {
  auth: AuthState;
}

export const initialState: AuthState = {
  users: [],
  error: null,
  message: null,
  isLoggedIn: false,
  token: null,
  loading: true,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => ({
    ...state,
    isLoggedIn: true,
    token: response.token,
    message: response.message || '',
    error: null
  })),
  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    message: null
  })),
  on(authActions.registerSuccess, (state, { response }) => ({
    ...state,
    token: response.token,
    message: response.message,
    error: null
  })),
  on(authActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    message: null
  })),
  on(authActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null
  })),
  on(authActions.fetchUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(authActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);




// import { createReducer, on } from '@ngrx/store';
// import {authActions} from "../actions/auth.actions";
// import { User } from '../../models/auth';


// export interface AuthState {
//   users: User[];
//   error: string | null;
//   message: string | null;
//   isLoggedIn: boolean;
//   token: string | null;
// }

// export interface AuthInterface {
//   loginSuccessMessage: string;
//   loginErrorMessage: string;
//   loginLoading: boolean;
//   registerSuccessMessage: string;
//   registerErrorMessage: string;
//   registerLoading: boolean;
// }


// export interface AppState {
//   auth: AuthState;
// }

// export const initialState: AuthState = {
//   users: [],
//   error: null,
//   message: null,
//   isLoggedIn: false,
//   token: null
// };

// export const authReducer = createReducer(
//   initialState,
//   on(authActions.loginSuccess, (state, { response }) => ({
//     ...state,
//     isLoggedIn: true,
//     token: response.token,
//     message: response.message || '',
//     error: null
//   })),
//   on(authActions.loginFailure, (state, { error }) => ({
//     ...state,
//     error,
//     message: null
//   })),
//   on(authActions.registerSuccess, (state, { response }) => ({
//     ...state,
//     token: response.token,
//     message: response.message,
//     error: null
//   })),
//   on(authActions.registerFailure, (state, { error }) => ({
//     ...state,
//     error,
//     message: null
//   })),
//   on(authActions.fetchUsersSuccess, (state, { users }) => ({
//     ...state,
//     users,
//     error: null
//   })),
//   on(authActions.fetchUsersFailure, (state, { error }) => ({
//     ...state,
//     error
//   })),
//   on(authActions.deleteUserSuccess, (state, {  }) => ({
//     ...state,
//     message: success ? 'User deleted successfully' : 'User deletion failed',
//     error: null
//   })),
//   on(authActions.deleteUserFailure, (state, { error }) => ({
//     ...state,
//     error
//   }))
// );


