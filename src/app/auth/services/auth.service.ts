/**
 * AuthService provides a set of methods for making HTTP requests related to user authentication.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/interfaces/user.interface';
import { apiUrl } from 'src/app/constants/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
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
    return this.http.post<IUser>(`${apiUrl}/login`, { email, password });
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

}