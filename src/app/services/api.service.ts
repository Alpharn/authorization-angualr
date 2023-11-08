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

  // Auth methods
  public login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, { email, password });
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  // Assessment methods
  public getUserAssessments(): Observable<IAssessment[]> {
    return this.http.get<IAssessment[]>(`${this.apiUrl}/userassessments`);
  }

  public getAssessmentGraph(assessmentId: number): Observable<IAssessmentGraph> {
    const params = new HttpParams().set('id', assessmentId);
    
    return this.http.get<IAssessmentGraph>(`${this.apiUrl}/userassessments/graph`, { params });
  }

  // User methods
  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }
}