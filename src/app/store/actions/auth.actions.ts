import { createAction, props } from '@ngrx/store';

import { IUser, IAssessment, IAssessmentGraph } from 'src/app/interfaces/user.interface';

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
  
  /** Assessment actions */
  export const loadAssessments = createAction(
    '[Dashboard Page] Load Assessments'
  );
  
  export const loadAssessmentsSuccess = createAction(
    '[Dashboard API] Load Assessments Success',
    props<{ assessments: IAssessment[] }>()
  );
  
  export const loadAssessmentsFailure = createAction(
    '[Dashboard API] Load Assessments Failure',
    props<{ error: string }>()
  );
  
  /** Load users list actions */
  export const loadUsers = createAction(
    '[Admin Page] Load Users'
  );
  
  export const loadUsersSuccess = createAction(
    '[Admin API] Load Users Success',
    props<{ users: IUser[] }>()
  );
  
  export const loadUsersFailure = createAction(
    '[Admin API] Load Users Failure',
    props<{ error: string }>()
  );
  
  /** Load graph data actions */
  export const loadAssessmentGraph = createAction(
    '[Graph Page] Load Assessment Graph',
    props<{ assessmentId: number }>()
  );
  
  export const loadAssessmentGraphSuccess = createAction(
    '[Graph API] Load Assessment Graph Success',
    props<{ graphData: IAssessmentGraph }>()
  );
  
  export const loadAssessmentGraphFailure = createAction(
    '[Graph API] Load Assessment Graph Failure',
    props<{ error: string }>()
  );