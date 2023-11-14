import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from 'src/app/store/auth/actions/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
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

}