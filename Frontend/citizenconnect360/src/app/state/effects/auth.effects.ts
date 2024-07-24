import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../actions/auth.actions';
import { loginresponse, registerresponse } from '../../models/auth';
import { User } from '../../models/auth';


@Injectable()
export class AuthEffects {
    constructor(
      private actions$: Actions,
      private authService: AuthService
    ) {}
  
    login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.login),
        mergeMap(({ user }) =>
          this.authService.loginUsers(user).pipe(
            map((response: loginresponse) => authActions.loginSuccess({ response })),
            catchError((error: any) => of(authActions.loginFailure({ error: error.message })))
          )
        )
      )
    );
  
    register$ = createEffect(() =>
        this.actions$.pipe(
          ofType(authActions.register),
          mergeMap(({ user }) =>
            this.authService.registerUser(user).pipe(
              map((response: registerresponse) => authActions.registerSuccess({ response })),
              catchError((error: any) => of(authActions.registerFailure({ error: error.message })))
            )
          )
        )
      );
  
    fetchUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.fetchUsers),
        mergeMap(() =>
          this.authService.getUsers().pipe(
            map((users: User[]) => authActions.fetchUsersSuccess({ users })),
            catchError((error: any) => of(authActions.fetchUsersFailure({ error: error.message })))
          )
        )
      )
    );
  
    deleteUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.deleteUser),
        mergeMap(({ username, email, role }) =>
          this.authService.deleteUser(username, email, role).pipe(
            map(() => authActions.deleteUserSuccess({ username })),
            catchError((error: any) => of(authActions.deleteUserFailure({ error: error.message })))
          )
        )
      )
    );
  }
