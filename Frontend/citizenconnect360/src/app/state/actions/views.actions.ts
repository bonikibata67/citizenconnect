// src/app/state/actions/view.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadViews = createAction('[View] Load Views');
export const loadViewsSuccess = createAction('[View] Load Views Success', props<{ views: any[] }>());
export const loadViewsFailure = createAction('[View] Load Views Failure', props<{ error: any }>());

export const addView = createAction('[View] Add View', props<{ view: any }>());
export const addViewSuccess = createAction('[View] Add View Success', props<{ view: any }>());
export const addViewFailure = createAction('[View] Add View Failure', props<{ error: any }>());
