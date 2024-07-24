
import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authStatus = inject(AuthStatusService);

//   if (authStatus.isLoggedIn()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false; // Return false to cancel the navigation
//   }
// };

