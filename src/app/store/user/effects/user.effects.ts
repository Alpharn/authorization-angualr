import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

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