import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token';
import { AuthGuard } from './guard/auth.guard';
import { authReducer } from './state/reducers/auth.reducers';
import { AuthEffects } from './state/effects/auth.effects';
import routes from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { adminReducer } from './state/reducers/admin.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer
      // admin:adminReducer
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideEffects([AuthEffects]),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
};

// import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthEffects } from './state/effects/auth.effects';
// import { authReducer } from './state/reducers/auth.reducers';
// import { LoggingInterceptor } from './interceptors/logininterceptor';
// import routes  from './app.routes';





// import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideStore } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS} from '@angular/common/http';
// import { TokenInterceptor } from './interceptors/token';
// import { AuthGuard } from './guard/auth.guard';
// import { authReducer } from './state/reducers/auth.reducers';
// import { AuthEffects } from './state/effects/auth.effects';
// import routes from './app.routes';
// import { HttpClientModule } from '@angular/common/http';
// import { LoggingInterceptor } from './interceptors/logininterceptor';



// export const appConfig: ApplicationConfig = {
// //   providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
// //     provideStore(reducers, { metaReducers }),    
// //     provideEffects(),
// //     provideRouter(routes),
// //     provideHttpClient(
// //       withInterceptors([])),
// //       { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
// //     // AuthGuard,
// // ]
// providers: [
//   provideZoneChangeDetection({ eventCoalescing: true }),
//   provideRouter(routes),
//   provideHttpClient(withInterceptors([LoggingInterceptor])),
//   provideStore({
//     auth: authReducer,
//     // blogs: blogReducer,
//     // counter: counterReducer,
//     // dummy: dummyReducer
//   }),
//   provideStoreDevtools({
//     maxAge: 25,
//     logOnly: !isDevMode()
//   }),
//   provideEffects([AuthEffects])
// ]
// };

// provideRouter(routes)
