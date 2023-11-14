import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users ?? []
);

export const selectAssessments = createSelector(
  selectUserState,
  (state: UserState) => state.assessments || []
);

export const selectAssessmentGraph = createSelector(
  selectUserState,
  (state: UserState) => state.assessmentGraph
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);