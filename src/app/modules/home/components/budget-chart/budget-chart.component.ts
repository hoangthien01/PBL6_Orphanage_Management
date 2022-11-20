import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
//
import { DxChartComponent } from 'devextreme-angular';

@Component({
	selector: 'app-budget-chart',
	templateUrl: './budget-chart.component.html',
	styleUrls: ['./budget-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetChartComponent implements OnInit, OnDestroy {
	@ViewChild('chartComponent') chartComponent: DxChartComponent;
    //
	projectId: number;
	dataSource = [
        {
            donate: 1193900,
            expense: 763133,
            day: 1
        },
        {
            donate: 2424242,
            expense: 32323,
            day: 2
        },
        {
            donate: 32332,
            expense: 32,
            day: 3
        },
        {
            donate: 32323133,
            expense: 12112,
            day: 4
        },
        {
            donate: 323233,
            expense: 3233,
            day: 5
        },
        {
            donate: 1314155,
            expense: 11212,
            day: 6
        },
    ];

	isLoading = false;
	isSidebarMenuExpanded = true;

	subscription: Subscription = new Subscription();

	constructor(
		private cdr: ChangeDetectorRef,
		private store: Store,
	) {}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getTaskReportByTime() {
		this.isLoading = true;
		//
		// this.projectService
		// 	.getProjectReportsByTime(this.projectId, this.filterOption)
		// 	.pipe(
		// 		finalize(() => {
		// 			this.isLoading = false;
		// 			//
		// 			this.cdr.markForCheck();
		// 		})
		// 	)
		// 	.subscribe(res => {
		// 		if (!res || !res.reports || !res.reports.length) {
		// 			return;
		// 		}

		// 		this.taskStatesByTimeDataSource = res.reports;
		// 	});
	}

    legendColorByStateNameHandler = (stateName: string) => {
		switch (stateName) {
			case 'Tiền thu':
				return '#4EC43B';
			case 'Tiền chi':
				return '#EB543C';
		}
	};
}
