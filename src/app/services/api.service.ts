/**
 * ApiService provides a set of methods for making HTTP requests related to user assessments, 
 * and user management.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, IAssessment, IAssessmentGraph } from '../interfaces/user.interface';
import { apiUrl } from '../constants/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  constructor(private http: HttpClient) {}

  /**
   * Get the assessments associated with the current user.
   * 
   * @returns An Observable array of IAssessment interface containing assessment details.
   */
  public getUserAssessments(): Observable<IAssessment[]> {
    return this.http.get<IAssessment[]>(`${apiUrl}/userassessments`);
  }

  /**
   * Fetch the graph data for a specific assessment by its ID.
   * 
   * @param assessmentId The unique identifier of the assessment.
   * 
   * @returns An Observable of the IAssessmentGraph interface containing graph data.
   */
  public getAssessmentGraph(assessmentId: number): Observable<IAssessmentGraph> {
    const params = new HttpParams().set('id', assessmentId);
    
    return this.http.get<IAssessmentGraph>(`${apiUrl}/userassessments/graph`, { params });
  }
  
  /**
   * Retrieve a list of all users.
   * 
   * @returns An Observable array of IUser interface containing user details.
   */
  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${apiUrl}/users`);
  }
  
}