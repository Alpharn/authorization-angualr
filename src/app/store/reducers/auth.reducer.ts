import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';
import { IUser, IAssessment, IAssessmentGraph } from 'src/app/interfaces/user.interface';

/**
 * AppState represents the state structure for the application, encapsulating user data,
 * assessment information, and loading/error states.
 */
export interface AppState {
  user: IUser | null;
  users: IUser[];
  assessments: IAssessment[] | null;
  assessmentGraph: IAssessmentGraph | null;
  loading: boolean;
  error: string | null;
}

/**
 * initialState provides the initial value for the application's state before any actions have been dispatched.
 */
export const initialState: AppState = {
  user: null,
  users: [],
  assessments: [],
  assessmentGraph: null,
  loading: false,
  error: null,
};

/** appReducer is the main reducer function for handling state changes based on dispatched actions */
export const appReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false
  })),
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