import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil, tap } from 'rxjs';

import { PaginationService } from 'src/app/services/pagination.service';
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
    private router: Router,
    private paginationService: PaginationService
  ) {}

  /**
   * OnInit lifecycle hook to dispatch actions to load assessments and subscribe to
   * assessment data changes.
   */
  ngOnInit(): void {
    this.assessments$
    .pipe(
      takeUntil(this.unsubscribe$),
      tap(() => {
        const pageSize = this.paginationService.getPageSize();
        const pageIndex = this.paginationService.getPageIndex();
        if (this.paginator) {
          this.paginator.pageSize = pageSize;
          this.paginator.pageIndex = pageIndex;
        }
      })
    )
    .subscribe(assessments => {
      this.dataSource.data = assessments;
    });
    
    this.store.dispatch(UserActions.loadAssessments());
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

  /**
   * Handles the pagination change event. 
   * Updates the page size and current page index in the pagination service.
   *
   * @param event The page event containing information about the page size and the current page index.
   */
  onPageEvent(event: PageEvent): void {
    this.paginationService.setPageSize(event.pageSize);
    this.paginationService.setPageIndex(event.pageIndex);
  }
  
}