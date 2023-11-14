import { createAction, props } from '@ngrx/store';

import { IUser } from 'src/app/interfaces/user.interface';

/** Login actions */ 
export const login = createAction(
    '[Auth Page] Login',
    props<{ email: string; password: string }>()
  );
  
  export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ user: IUser }>()
  );
  
  export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ error: string }>()
  );