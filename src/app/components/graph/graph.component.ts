import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import Chart from 'chart.js/auto';
import { AppState } from 'src/app/store/reducers/auth.reducer';
import * as AuthActions from 'src/app/store/actions/auth.actions';
import { selectAssessmentGraph } from 'src/app/store/selectors/auth.selectors';
import { IAssessmentGraph } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  private chart: Chart | undefined;
  private destroy$ = new Subject<void>();
  private assessmentGraph$ = this.store.select(selectAssessmentGraph);
  
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const assessmentId = +this.route.snapshot.params['id'] - 1;
    this.store.dispatch(AuthActions.loadAssessmentGraph({ assessmentId: assessmentId }));

    this.assessmentGraph$.pipe(takeUntil(this.destroy$)).subscribe(graphData => {
      if (graphData && this.canvas) {
        this.initChart(graphData);
      }
    });
  }
  
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.chart?.destroy();
  }

}