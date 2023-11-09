import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import * as UserActions from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/reducers/auth.reducer';
import { selectAssessments } from 'src/app/store/selectors/auth.selectors';
import { IAssessment } from 'src/app/interfaces/user.interface';

/** DashboardComponent is responsible for displaying a list of assessments in a table format */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  /** Observable stream of assessment data from the store. */
  assessments$ = this.store.select(selectAssessments);

  /** Columns displayed in the table. */
  displayedColumns: string[] = ['id', 'name', 'image', 'usersResolved', 'active', 'report'];

   /** DataSource for MatTable that contains the data to display. */
  dataSource = new MatTableDataSource<IAssessment>([]);

  /** Subject used to trigger the unsubscription of observables on component destruction. */ 
  private unsubscribe$ = new Subject<void>();

  /** Reference to the paginator component used to paginate the table. */ 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  /**
   * OnInit lifecycle hook to dispatch actions to load assessments and subscribe to
   * assessment data changes.
   */
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadAssessments());
    this.assessments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(assessments => {
        this.dataSource.data = assessments;
      });
  }

  /** AfterViewInit lifecycle hook to set the paginator for the table's DataSource */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** OnDestroy lifecycle hook to complete the unsubscribe$ Subject, ensuring no memory leaks */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Handles click events on assessment items, preventing event propagation and
   * navigating to the graph view for the selected assessment.
   *
   * @param assessmentId The ID of the clicked assessment.
   * 
   * @param event The click event object.
   */
  onAssessmentClick(assessmentId: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/graph', assessmentId]);
  }

}