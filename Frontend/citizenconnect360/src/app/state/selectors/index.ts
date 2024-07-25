

import { AuthState } from "../reducers/auth.reducers";
import { AdminState } from "../reducers/admin.reducers";
// import { BlogInterface } from "./Reducers/blog.reducer";
// import { CounterInterface } from "./Reducers/counter.reducer";
// import { DummyRI } from "./Reducers/dummy.reducer";




export interface AppState {
  auth: AuthState;
  admin:AdminState
}
