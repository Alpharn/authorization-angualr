/**
 * ApiService provides a set of methods for making HTTP requests related to user authentication,
 * assessments, and user management.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, IAssessment, IAssessmentGraph } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://user-assessment-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  /**
   * Authenticate a user with provided email and password.
   * 
   * @param email The user's email address.
   * 
   * @param password The user's password.
   * 
   * @returns An Observable of the IUser interface containing user data.
   */
  public login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Retrieve the authentication token from local storage.
   * 
   * @returns The token string or null if not present.
   */
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Check if the current user has an 'Admin' role.
   * 
   * @returns A boolean indicating if the user is an admin.
   */
  public isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  /**
   * Get the assessments associated with the current user.
   * 
   * @returns An Observable array of IAssessment interface containing assessment details.
   */
  public getUserAssessments(): Observable<IAssessment[]> {
    return this.http.get<IAssessment[]>(`${this.apiUrl}/userassessments`);
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
    
    return this.http.get<IAssessmentGraph>(`${this.apiUrl}/userassessments/graph`, { params });
  }
  
  /**
   * Retrieve a list of all users.
   * 
   * @returns An Observable array of IUser interface containing user details.
   */
  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }
}