import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(ApiService).getToken();
  if (token) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};