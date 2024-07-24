import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CitizenGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isCitizen()) {
      return true;
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}

// export const citizenGuard: CanActivateFn = (route, state) => {
//   return true;
// };
