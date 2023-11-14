import { createReducer, on } from '@ngrx/store';

import * as AuthActions from 'src/app/store/auth/actions/auth.actions';
import { authInitialState } from '../auth.state';


export const authReducer = createReducer(
  authInitialState,
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
);