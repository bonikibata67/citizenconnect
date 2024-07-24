// // src/app/state/reducers/view.reducer.ts
// import { createReducer, on } from '@ngrx/store';
// import { loadViewsSuccess, addViewSuccess } from '../actions/view.actions';

// export interface ViewState {
//     views: any[];
// }

// export const initialState: ViewState = {
//     views: [],
// };

// export const viewReducer = createReducer(
//     initialState,
//     on(loadViewsSuccess, (state, { views }) => ({ ...state, views })),
//     on(addViewSuccess, (state, { view }) => ({ ...state, views: [...state.views, view] })),
// );
