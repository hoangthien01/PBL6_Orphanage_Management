import {Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';
import {cloneDeep, isEqual} from 'lodash-es';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
//
import {AppNotify, CommonFunction, ENDPOINTS} from 'src/app/utilities';
import {ADMIN_SUBSCRIPTION_PAGES, CURRENCY_FORMAT} from '@app/shared/app.constants';
import {SubscriptionPlanService} from '@app/modules/admin/services/subscription-plan.service';
import {SubscriptionPlanModel} from '@app/modules/admin/models/subscription-plan.model';
import {CustomRouteService} from '@app/core/services';

@Component({
    selector: 'app-subscription-plan-details',
    templateUrl: './subscription-plan-details.component.html',
    styleUrls: ['./subscription-plan-details.component.scss']
})
export class SubscriptionPlanDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('nameTextBox') nameTextBox: DxTextBoxComponent;

    @Input() subscriptionPlans: SubscriptionPlanModel[] = [];

    currencyFormat = CURRENCY_FORMAT;

    currentPlan: SubscriptionPlanModel = new SubscriptionPlanModel();
    clonedCurrentPlan: SubscriptionPlanModel;

    disableUpdate = true;
    isAddMode = false;
    isProcessing: boolean = false;

    validateEmail$: Subject<string> = new Subject<string>();
    valueChanged$: Subject<void> = new Subject<void>();
    subscription: Subscription = new Subscription();

    validationCallbacks = {
        validateEmail: (params) => {
            this.validateEmail$.next(params.value);
            return true;
        }
    };

    constructor(private router: Router,
                private subscriptionPlanService: SubscriptionPlanService,
                private customRouteService: CustomRouteService,
                private activatedRoute: ActivatedRoute) {
        this.subscription.add(this.valueChanged$.pipe(
            debounceTime(300)
        ).subscribe(() => {
            this.checkDataIsValid();
        }));

        this.subscription.add(this.validateEmail$.pipe(
            debounceTime(350),
            distinctUntilChanged()
        ).subscribe((name) => {
            if (!this.isAddMode && (this.currentPlan.name.trim() === this.clonedCurrentPlan.name.trim())) {

                return;
            }

            this.subscriptionPlanService.checkNameIsUnique(name)
                .subscribe((result) => {
                    this.nameTextBox.instance.option('isValid', result);
                    this.nameTextBox.instance.option('validationError',
                        {message: result ? '' : 'Subscription Plan is already exist'});
                    this.checkDataIsValid();
                });
        }));
	}

	ngOnInit() {
        this.subscription.add(this.customRouteService.currentUrl$.subscribe(() => {
            this.getParamsFromRoute();
        }));

        if (this.isAddMode && this.nameTextBox) {
            setTimeout(() => {
                this.nameTextBox.instance.focus();
            }, 200);
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    changeData() {
        this.valueChanged$.next();
    }

    checkDataIsValid() {
        const plan = this.currentPlan;

        const isHasDataNull = (!plan.name || !plan.name.trim()) || !this.nameTextBox.isValid;
        this.disableUpdate = this.isAddMode ? isHasDataNull
			: isHasDataNull || isEqual(this.clonedCurrentPlan, this.currentPlan);
	}

	getParamsFromRoute() {
        const snapshot = this.activatedRoute.snapshot;
        if (snapshot.params.id === ADMIN_SUBSCRIPTION_PAGES.New) {
            this.isAddMode = true;
        } else if (this.currentPlan.id !== snapshot.params.id) {
            this.currentPlan.id = snapshot.params.id;
            this.getPlanDetail();
        }
    }

	getPlanDetail() {
		this.subscriptionPlanService.get(this.currentPlan.id).subscribe((res) => {
			this.currentPlan = new SubscriptionPlanModel(res);
			this.clonedCurrentPlan = cloneDeep(this.currentPlan);
		});
	}

	async backToList() {
		if (!this.disableUpdate) {
            const title = 'Cancel';
            const message = 'Are you sure you want to cancel editing?';
            const confirm = await CommonFunction.confirmDialogPromise(title,
                message).then();
            if (confirm) {
                this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN).then();
            }

            return;
        }

        this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN).then();
    }

	savePlan() {
		const plan = this.currentPlan;
		this.isAddMode ? this.addPlan(plan) : this.updatePlan(plan);
	}

	private addPlan(plan: SubscriptionPlanModel) {
        this.isProcessing = true;
        //
        this.subscriptionPlanService.add(plan).pipe(finalize(() => {
            this.isProcessing = false;
        })).subscribe((res) => {
            this.currentPlan.id = res;
            this.subscriptionPlanService.raiseRefreshGrid(this.currentPlan);
            //
            AppNotify.success(AppNotify.generateSuccessMessage('subscription plan', 'added'));
            //
            this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN).then();
        });
    }

	private updatePlan(plan: SubscriptionPlanModel) {
        this.isProcessing = true;
        //
        this.subscriptionPlanService.update(plan).pipe(finalize(() => {
            this.isProcessing = false;
        })).subscribe(() => {
            this.subscriptionPlanService.raiseRefreshGrid(this.currentPlan);
            //
            AppNotify.success(AppNotify.generateSuccessMessage('subscription plan', 'updated'));
            //
            this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN).then();
        });
    }
}
