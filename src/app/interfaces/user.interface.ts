export interface IUser {
  first_name: string;
  last_name: string;
  role: 'User' | 'Admin';
  token: string;
}

export interface IAssessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface IAssessmentGraphData {
  [key: string]: number;
}

export interface IAssessmentGraph {
  data: IAssessmentGraphData;
  type: string; 
}