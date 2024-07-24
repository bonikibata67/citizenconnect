// import { createActionGroup, props } from '@ngrx/store';
// import { adduser, loginuser, registerresponse, loginresponse, User } from '../../models/auth';

// export const authActions = createActionGroup({
//     source: 'Auth API',
//     events: {
//         'Login': props<{ user: loginuser }>(),
//         'Login Success': props<{ response: loginresponse }>(),
//         'Login Failure': props<{ error: string }>(),
        
//         'Register': props<{ user: adduser }>(),
//         'Register Success': props<{ response: registerresponse }>(),
//         'Register Failure': props<{ error: string }>(),
      
//         // 'Fetch Users': props<void>(),
//         'Fetch Users Success': props<{ users: User[] }>(),
//         'Fetch Users Failure': props<{ error: string }>(),
        
//         'Delete User': props<{ username: string, email: string, role: string }>(),
//         'Delete User Success': props<{ username: string }>(),
//         'Delete User Failure': props<{ error: string }>()
//     }
// });
import { createAction, props } from '@ngrx/store';
import { loginuser, loginresponse, registerresponse, User, adduser } from '../../models/auth';

export const authActions = {
  login: createAction('[Auth API] Login', props<{ user: loginuser }>()),
  loginSuccess: createAction('[Auth API] Login Success', props<{ response: loginresponse }>()),
  loginFailure: createAction('[Auth API] Login Failure', props<{ error: string }>()),
  
  register: createAction('[Auth API] Register', props<{ user: adduser }>()),
  registerSuccess: createAction('[Auth API] Register Success', props<{ response: registerresponse }>()),
  registerFailure: createAction('[Auth API] Register Failure', props<{ error: string }>()),

  fetchUsers: createAction('[Auth API] Fetch Users'),
  fetchUsersSuccess: createAction('[Auth API] Fetch Users Success', props<{ users: User[] }>()),
  fetchUsersFailure: createAction('[Auth API] Fetch Users Failure', props<{ error: string }>()),

  deleteUser: createAction('[Auth API] Delete User', props<{ username: string, email: string, role: string }>()),
  deleteUserSuccess: createAction('[Auth API] Delete User Success', props<{ username: string }>()),
  deleteUserFailure: createAction('[Auth API] Delete User Failure', props<{ error: string }>()),
};






