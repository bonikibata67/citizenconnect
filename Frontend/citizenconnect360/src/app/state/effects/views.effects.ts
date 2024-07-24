// // src/app/state/effects/view.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { AuthService } from '../../services/auth.service';
// import{viewsactions} from '../actions/view.actions';
// // import * as viewActions from '../actions/view.actions';

// @Injectable()
// export class ViewEffects {
//     loadViews$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(viewsactions.loadViews),
//             mergeMap(() =>
//                 this.authService.getViews().pipe(
//                     map(views => viewsactions.loadViewsSuccess({ views })),
//                     catchError(error => of(viewsactions.loadViewsFailure({ error })))
//                 )
//             )
//         )
//     );

//     addView$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(viewsactions.addView),
//             mergeMap(action =>
//                 this.authService.addView(action.view).pipe(
//                     map(view => viewsactions.addViewSuccess({ view })),
//                     catchError(error => of(viewsactions.addViewFailure({ error })))
//                 )
//             )
//         )
//     );

//     constructor(
//         private actions$: Actions,
//         private authService: AuthService
//     ) { }
// }
