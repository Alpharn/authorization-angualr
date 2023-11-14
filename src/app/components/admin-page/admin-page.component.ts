import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { IUser } from 'src/app/interfaces/user.interface';
import * as UserActions from 'src/app/store/user/actions/user.actions';
import { UserState } from 'src/app/store/user/user.state';
import { selectUsers } from 'src/app/store/user/selectors/user.selectors';

/**
 * AdminPageComponent is responsible for displaying the list of users in a tabular format,
 * specifically for administrative purposes. 
 */
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit, AfterViewInit {

  /** Columns to be displayed in the table. */
  displayedColumns: string[] = ['name', 'lastName', 'dateOfBirth', 'education', 'role', 'position'];

  /** DataSource for the MatTable, containing the user data. */
  dataSource = new MatTableDataSource<IUser>([]);

  /** Subject that emits when the component is destroyed to unsubscribe from observables. */
  private unsubscribe$ = new Subject<void>();
  
  /** Reference to the paginator component, which provides pagination functionality for the table. */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private store: Store<UserState>) {}
 
  /**
   * OnInit lifecycle hook to dispatch an action to load users and subscribe to the user data.
   */
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.store.select(selectUsers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        this.dataSource.data = users;
      });
  }

  /**
   * AfterViewInit lifecycle hook to associate the paginator with the dataSource once the view is initialized.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * OnDestroy lifecycle hook to ensure that all subscriptions are closed.
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}