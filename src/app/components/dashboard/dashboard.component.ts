import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import * as AuthActions from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/reducers/auth.reducer';
import { selectAssessments } from 'src/app/store/selectors/auth.selectors';
import { IAssessment } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  assessments$ = this.store.select(selectAssessments);
  displayedColumns: string[] = ['id', 'name', 'image', 'usersResolved', 'active', 'report'];
  dataSource = new MatTableDataSource<IAssessment>([]); 
  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadAssessments());
    this.assessments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(assessments => {
        this.dataSource.data = assessments;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAssessmentClick(assessmentId: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/graph', assessmentId]);
  }

}