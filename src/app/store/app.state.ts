import { ActionReducerMap } from '@ngrx/store';
import { UserState, userInitialState } from './user/user.state';
import { AuthState, authInitialState } from './auth/auth.state';
import { authReducer } from './auth/reducers/auth.reducer'
import { userReducer } from './user/reducers/user.reducer';

export const authStateKey = 'auth';
export const userStateKey = 'user';

export interface AppState {
  [authStateKey]: AuthState;
  [userStateKey]: UserState;
}

export const initialState: AppState = {
  [authStateKey]: authInitialState,
  [userStateKey]: userInitialState,
};

export const appReducers: ActionReducerMap<AppState> = {
  [authStateKey]: authReducer,
  [userStateKey]: userReducer,
};
