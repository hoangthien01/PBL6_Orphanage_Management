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
import { DonerService } from '../../services/doner.service';
import { BudgetChartModel } from '../../models/bugget-chart-item.model';
import { ActivityTypeModel } from '@app/modules/activity/models/activity-type.model';
import { ActivityService } from '@app/modules/activity/services/activity.service';

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
	dataSource: BudgetChartModel[];
    endDate: Date = new Date();
    activityTypes: ActivityTypeModel[] = [{
        id: 'all',
        name: 'All',
    }];
    startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
    //
	isLoading = false;
    activityType = 'all';
    totalDonate: number;
    totalExpense: number;
	isSidebarMenuExpanded = true;

	subscription: Subscription = new Subscription();

	constructor(
		private cdr: ChangeDetectorRef,
		private store: Store,
        private activityService: ActivityService,
        private donorService: DonerService
	) {}

	ngOnInit(): void {
        this.getActivityTypes();
        this.getBudgetChartData();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

    getActivityTypes() {
        this.activityService.getActivityTypes().subscribe(
          res => {
            this.activityTypes = [...this.activityTypes, ...res];
          }
        )
    }

    filterActivityTypeChanged() {
        this.getBudgetChartData();
    }

	getBudgetChartData() {
		this.isLoading = true;
		//
		this.donorService
			.getStatisticChartData({
                start_date: this.startDate.toISOString().split('T')[0],
                end_date: this.endDate.toISOString().split('T')[0],
                id: this.activityType
            })
			.pipe(
				finalize(() => {
					this.isLoading = false;
					//
					this.cdr.markForCheck();
				})
			)
			.subscribe(res => {
                this.totalDonate = res.total_donate;
                this.totalExpense = res.total_expense;
				this.dataSource = res.details.map( _ =>  {
                    _.donate = _.donate * 1000;
                    _.expense = _.expense * 1000;
                    return _;
                });
			});
	}

    legendColorByStateNameHandler = (stateName: string) => {
		switch (stateName) {
			case 'Tiền thu':
				return '#4EC43B';
			case 'Tiền chi':
				return '#EB543C';
		}
	};

    onChangeDateRange(e) {
        if (e !== null) {
            this.startDate = e.start;
            this.endDate = e.end;
            this.getBudgetChartData();
        }
    }
}
