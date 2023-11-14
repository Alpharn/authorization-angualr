import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivateFn,
  UrlTree,
} from '@angular/router';
import { RoutePath } from '../constants/routes';
import { ApiService } from '../services/api.service';
import { Observable, map } from 'rxjs';

export const graphGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  const assessmentId = +route.params['id'];

  return apiService.getUserAssessments().pipe(
    map(assessments =>
      assessments.some(assessment => assessment.id === assessmentId) ?
        true : router.createUrlTree([RoutePath.Dashboard])
    )
  );
};
