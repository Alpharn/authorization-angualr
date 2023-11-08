import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/auth.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectUsers = createSelector(
  selectAppState,
  (state: AppState) => state.users ?? []
);

export const selectAssessments = createSelector(
  selectAppState,
  (state: AppState) => state.assessments || []
);

export const selectAssessmentGraph = createSelector(
  selectAppState,
  (state: AppState) => state.assessmentGraph
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);