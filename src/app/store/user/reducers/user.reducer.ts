import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { userInitialState } from '../user.state';

export const userReducer = createReducer(
  userInitialState,
  on(UserActions.loadAssessments, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadAssessmentsSuccess, (state, { assessments }) => ({
    ...state,
    assessments,
    loading: false
  })),
  on(UserActions.loadAssessmentsFailure, (state, { error }) => ({
    ...state,
    loading: false
  })),
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false
  })),
  on(UserActions.loadAssessmentGraph, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadAssessmentGraphSuccess, (state, { graphData }) => ({
    ...state,
    assessmentGraph: graphData,
    loading: false
  })),
  on(UserActions.loadAssessmentGraphFailure, (state, { error }) => ({
    ...state,
    assessmentGraph: null,
    loading: false
  })),
);