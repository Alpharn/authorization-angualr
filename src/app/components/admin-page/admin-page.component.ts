import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { IUser } from 'src/app/interfaces/user.interface';
import * as AuthActions from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/reducers/auth.reducer';
import { selectUsers } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'lastName', 'dateOfBirth', 'education', 'role', 'position'];
  dataSource = new MatTableDataSource<IUser>([]);
  private unsubscribe$ = new Subject<void>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private store: Store<AppState>) {}
 
  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadUsers());
    this.store.select(selectUsers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        this.dataSource.data = users;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}