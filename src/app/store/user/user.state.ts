import { IUser, IAssessment, IAssessmentGraph } from 'src/app/interfaces/user.interface';

export interface UserState {
  assessments: IAssessment[] | null;
  assessmentGraph: IAssessmentGraph | null;
  users: IUser[];
  loading: boolean;
}

export const userInitialState: UserState = {
  users: [],
  assessments: [],
  assessmentGraph: null,
  loading: false,
};
