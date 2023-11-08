import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  isAdmin$: Observable<boolean> = this.store.pipe(
    select(state => localStorage.getItem('role') === 'Admin')
  );

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  goToAdminPage(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
