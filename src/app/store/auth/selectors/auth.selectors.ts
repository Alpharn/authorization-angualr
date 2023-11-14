import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';

export const selectAuth = createFeatureSelector<AuthState>('auth');