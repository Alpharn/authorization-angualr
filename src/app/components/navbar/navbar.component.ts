import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { AuthState } from 'src/app/store/auth/auth.state';

/** NavbarComponent is responsible for rendering the navigation bar at the top of the application */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /** Stream that emits true if the authenticated user is an admin. */
  isAdmin$: Observable<boolean> = this.store.pipe(
    select(state => localStorage.getItem('role') === 'Admin')
  );

  /** Observable that determines if the back button should be shown based on the current URL. */  
  showBackButton$: Observable<boolean> = this.router.events.pipe(
    map(() => {
      const url = this.router.url;
      return url.includes('/graph') || url.includes('/admin');
    })
  );

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private location: Location
  ) {}
   
  /** Logs out the current user by clearing the local storage and navigating to the login page */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  /** Navigates user to the dashboard page from other pages */
  goBack(): void {
    this.location.back();
  }

}
