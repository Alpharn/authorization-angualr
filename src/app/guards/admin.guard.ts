import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { ApiService } from '../services/api.service';

export const adminGuard: CanActivateFn = () => inject(ApiService).isAdmin();