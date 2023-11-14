import { IUser } from 'src/app/interfaces/user.interface';

export interface AuthState {
  user: IUser | null;
}

export const authInitialState: AuthState = {
  user: null,
};