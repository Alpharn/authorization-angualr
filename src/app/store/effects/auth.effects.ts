import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}

  /** Effect for user login action */
  public login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(({ email, password }) =>
      this.apiService.login(email, password).pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role);
          this.router.navigate(['/dashboard']);
        }),
        map((user) => AuthActions.loginSuccess({ user })),
        catchError((error) => of(AuthActions.loginFailure({ error })))
      )
    )
  )
  );

  /** Effect for loading assessments action */
  public loadAssessments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAssessments),
      switchMap(() =>
        this.apiService.getUserAssessments().pipe(
          map(assessments => AuthActions.loadAssessmentsSuccess({ assessments })),
          catchError(error => of(AuthActions.loadAssessmentsFailure({ error })))
        )
      )
    )
  );

  /** Effect for loading users action */
  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUsers),
      switchMap(() =>
        this.apiService.getUsers().pipe(
          map(users => AuthActions.loadUsersSuccess({ users })),
          catchError(error => of(AuthActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  /** Effect for loading a specific assessment graph */
  public loadAssessmentGraph$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAssessmentGraph),
      switchMap(({ assessmentId }) =>
        this.apiService.getAssessmentGraph(assessmentId).pipe(
          map(graphData => AuthActions.loadAssessmentGraphSuccess({ graphData })),
          catchError(error => of(AuthActions.loadAssessmentGraphFailure({ error })))
        )
      )
    )
  );

}