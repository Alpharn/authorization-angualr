/**
 * IUser defines the structure for user data, including basic identity and role information,
 * as well as authentication tokens.
 */
export interface IUser {
  first_name: string;
  last_name: string;
  role: 'User' | 'Admin';
  token: string;
}

/**
 * IAssessment represents the structure of an assessment, detailing its identification,
 * name, the number of users who have resolved it, its active status, and a related image URL.
 */
export interface IAssessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

/**
 * IAssessmentGraphData defines the data structure used to represent the graph data
 * for an assessment, where each key corresponds to a label on the graph and the value
 * is the numerical data point associated with that label.
 */
export interface IAssessmentGraphData {
  [key: string]: number;
}

/**
 * IAssessmentGraph provides the structure for graph-related data, including the
 * assessment graph data and the type of graph to be displayed.
 */
export interface IAssessmentGraph {
  data: IAssessmentGraphData;
  type: string; 
}