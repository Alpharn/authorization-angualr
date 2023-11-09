import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { ApiService } from '../services/api.service';

/**
 * Guard function that checks if the current user has an admin role.
 * It leverages the `isAdmin` method from the `ApiService` to determine the user's role.
 *
 * @returns A boolean value indicating whether navigation to a route should be allowed
 *          for admin users.
 */
export const adminGuard: CanActivateFn = () => inject(ApiService).isAdmin();