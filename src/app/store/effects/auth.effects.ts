import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  /** Effect for user login action */
  public login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
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
      ofType(UserActions.loadAssessments),
      switchMap(() =>
        this.apiService.getUserAssessments().pipe(
          map(assessments => UserActions.loadAssessmentsSuccess({ assessments })),
          catchError(error => of(UserActions.loadAssessmentsFailure({ error })))
        )
      )
    )
  );

  /** Effect for loading users action */
  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.apiService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  /** Effect for loading a specific assessment graph */
  public loadAssessmentGraph$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAssessmentGraph),
      switchMap(({ assessmentId }) =>
        this.apiService.getAssessmentGraph(assessmentId).pipe(
          map(graphData => UserActions.loadAssessmentGraphSuccess({ graphData })),
          catchError(error => of(UserActions.loadAssessmentGraphFailure({ error })))
        )
      )
    )
  );

}