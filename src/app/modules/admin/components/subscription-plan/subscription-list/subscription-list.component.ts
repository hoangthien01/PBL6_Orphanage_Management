import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
//
import {ALLOWED_PAGE_SIZES, CURRENCY_FORMAT} from '@app/shared/app.constants';
import {AppNotify, CommonFunction, ENDPOINTS} from 'src/app/utilities';
import {SubscriptionPlanService} from '@app/modules/admin/services/subscription-plan.service';
import {SubscriptionPlanModel} from '@app/modules/admin/models/subscription-plan.model';

@Component({
	selector: 'app-subscription-list',
	templateUrl: './subscription-list.component.html',
	styleUrls: ['./subscription-list.component.scss']
})

export class SubscriptionListComponent implements OnInit, OnDestroy {
	@Input() searchKeyword: string;
	@ViewChild('planGrid') planGrid: DxDataGridComponent;
	gridSource: any = {};
	allowPageSizes = ALLOWED_PAGE_SIZES;
	subscriptionPlans: SubscriptionPlanModel[] = [];
	currencyFormat = CURRENCY_FORMAT;
	subscription: Subscription;

	columnSortOrder = {
		name: {key: 'name', value: undefined},
		baseCharge: {key: 'baseCharge', value: undefined},
		localNumber: {key: 'localNumber', value: undefined},
		localMinute: {key: 'localMinute', value: undefined},
		email: {key: 'email', value: undefined},
		sms: {key: 'sms', value: undefined},
		additionalLocalNumberCost: {key: 'additionalLocalNumberCost', value: undefined},
		additionalLocalMinuteCost: {key: 'additionalLocalMinuteCost', value: undefined},
        additionalEmailCost: {key: 'additionalEmailCost', value: undefined},
        additionalTollFreeCost: {key: 'additionalTollFreeCost', value: undefined},
        additionalTollFreeMinuteCost: {key: 'additionalTollFreeMinuteCost', value: undefined},
        additionalSMSCost: {key: 'additionalSMSCost', value: undefined},
        additionalMmsCost: {key: 'additionalMmsCost', value: undefined},
        trialDays: {key: 'trialDays', value: undefined},

		lookup: {key: 'lookup', value: undefined},
		additionalLookupCost: {key: 'additionalLookupCost', value: undefined}, 
    };

    updateDimensionInterval: any;

    isInit: boolean = false;
    isGridLoading = false;

    constructor(public router: Router, public subscriptionService: SubscriptionPlanService) {
        this.subscription = this.subscriptionService.subscribeRaiseRefreshGrid((planUpdated) => {
            let planIndex = this.subscriptionPlans.findIndex(_ => _.id === planUpdated.id);
            if (planIndex > -1) {
                this.subscriptionPlans[planIndex] = planUpdated;
            } else {
                this.subscriptionPlans.push(planUpdated);
            }
        });
    }

	ngOnInit() {
		this.getSubscriptionPlans();
	}

	getSubscriptionPlans() {
        this.isGridLoading = true;
        //
        this.subscriptionService.getSubscriptionPlans().pipe(finalize(() => {
            if (!this.isInit) {
                this.isInit = true;
            }
            //
            this.isGridLoading = false;
        })).subscribe(res => {
            this.subscriptionPlans = res;
            this.updateDimensions();
        });
    }

	refreshGrid() {
		if (this.planGrid && this.planGrid.instance) {
			this.planGrid.instance.refresh();
		}
	}

	// Updates the widget's content after resizing.
	updateDimensions() {
		if (this.planGrid) {
			// Updates the content of widget after resizing.
			clearInterval(this.updateDimensionInterval);
			this.updateDimensionInterval = setInterval(() => {
				clearInterval(this.updateDimensionInterval);
				if (CommonFunction.allowUpdateDimensions(this.planGrid.instance)) {
					CommonFunction.executeUpdateDimensions(this.planGrid.instance);
				}
			}, 500);
		}
	}

	showPlanDetail(planId: string) {
        this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN + `/${planId}`).then();
	}

	async confirmDeletePlan(plan) {
		if (plan.isSystem || plan.isDefault) {
			return;
		}

		let planId = plan.id;
		let title = 'Delete Plan';
		let message = 'Accounts are current assigned to this plan will be moved to Base Plan. <br><br>' +
			'Are you sure you want to delete this plan?';

		const confirm = await CommonFunction.confirmDeleteDialogPromise(title,
			message).then();
		if (confirm) {
			this.deletePlan(planId);
		}
	}

	onSortOrderChange(columnKey, sortValue) {
		Object.keys(this.columnSortOrder).forEach(key => {
			if (this.columnSortOrder[key].key !== columnKey) {
				this.columnSortOrder[key].value = undefined;
			} else {
				this.columnSortOrder[key].value = sortValue;
			}
		});
	}

	private deletePlan(planId: string) {
		this.subscriptionService.delete(planId).subscribe(() => {
            const removedPlanIndex = this.subscriptionPlans.findIndex(_ => _.id === planId);
            this.subscriptionPlans.splice(removedPlanIndex, 1);
            //
            AppNotify.success(AppNotify.generateSuccessMessage('subscription plan', 'deleted'));
        });
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

    searchByText(keyword: string) {
        this.planGrid.instance.searchByText(keyword);
    }
}

