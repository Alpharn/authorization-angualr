import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/reducers/auth.reducer';

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

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  /** Logs out the current user by clearing the local storage and navigating to the login page */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
