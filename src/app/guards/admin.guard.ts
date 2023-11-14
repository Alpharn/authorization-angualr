import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../auth/services/auth.service';
import { RoutePath } from 'src/app/constants/routes';

/**
 * Guard function that checks if the current user has an admin role.
 * If the user is not an admin, they are redirected to the dashboard page.
 *
 * @returns A boolean value indicating whether navigation to a route should be allowed
 *          for admin users.
 */
export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if (authService.isAdmin()) {
      return true;
    } else {
      router.navigate([RoutePath.Dashboard]); 
      return false;
    }
  };