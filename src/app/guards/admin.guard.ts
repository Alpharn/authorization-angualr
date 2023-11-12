import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ApiService } from '../services/api.service';

/**
 * Guard function that checks if the current user has an admin role.
 * If the user is not an admin, they are redirected to the dashboard page.
 *
 * @returns A boolean value indicating whether navigation to a route should be allowed
 *          for admin users.
 */
export const adminGuard: CanActivateFn = () => {
    const apiService = inject(ApiService);
    const router = inject(Router);
  
    if (apiService.isAdmin()) {
      return true;
    } else {
      router.navigate(['/dashboard']); 
      return false;
    }
  };