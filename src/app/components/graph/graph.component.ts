import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import Chart from 'chart.js/auto';
import { UserState } from 'src/app/store/user/user.state';
import * as UserActions from 'src/app/store/user/actions/user.actions';
import { selectAssessmentGraph } from 'src/app/store/user/selectors/user.selectors';
import { IAssessmentGraph } from 'src/app/interfaces/user.interface';

/**
 * GraphComponent is responsible for rendering a graph visualization for an assessment.
 * It subscribes to assessment graph data from the store and initializes a chart when data is available.
 */
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  /** Holds the instance of the Chart.js chart to display the assessment data graphically. */
  private chart: Chart | undefined;
  
  /** Subject used to trigger the unsubscription of observables on component destruction. */
  private destroy$ = new Subject<void>();

  /** Observable stream of the assessment graph data. */
  private assessmentGraph$ = this.store.select(selectAssessmentGraph);

  /** Reference to the canvas element in the template where the chart will be rendered. */
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor(
    private store: Store<UserState>,
    private route: ActivatedRoute
  ) {}

  /**
   * On component initialization, dispatches an action to load graph data and subscribes
   * to the assessmentGraph$ observable to receive the data.
   */
  ngOnInit(): void {
    const assessmentId = +this.route.snapshot.params['id'] - 1;
    this.store.dispatch(UserActions.loadAssessmentGraph({ assessmentId: assessmentId }));

    this.assessmentGraph$.pipe(takeUntil(this.destroy$)).subscribe(graphData => {
      if (graphData && this.canvas) {
        this.initChart(graphData);
      }
    });
  }

   /**
   * Initializes the Chart.js chart with the provided graph data.
   *
   * @param graphData The graph data to be displayed in the chart.
   */
  private initChart(graphData: IAssessmentGraph): void {
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context) {
      this.chart?.destroy();
      this.chart = new Chart(context, {
        type: 'bar',
        data: {
          labels: Object.keys(graphData.data),
          datasets: [{
            label: 'Score',
            data: Object.values(graphData.data),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  /**
   * On component destruction, triggers the completion of all active subscriptions
   * and destroys the chart instance to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.chart?.destroy();
  }

}