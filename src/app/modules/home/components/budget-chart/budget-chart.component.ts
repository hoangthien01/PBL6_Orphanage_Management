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
    startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
    //
	isLoading = false;
	isSidebarMenuExpanded = true;

	subscription: Subscription = new Subscription();

	constructor(
		private cdr: ChangeDetectorRef,
		private store: Store,
        private donorService: DonerService
	) {}

	ngOnInit(): void {
        this.getBudgetChartData();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getBudgetChartData() {
		this.isLoading = true;
		//
		this.donorService
			.getStatisticChartData({
                start_date: this.startDate.toISOString().split('T')[0],
                end_date: this.endDate.toISOString().split('T')[0],
            })
			.pipe(
				finalize(() => {
					this.isLoading = false;
					//
					this.cdr.markForCheck();
				})
			)
			.subscribe(res => {
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
