import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
//
import {ADMIN_SUBSCRIPTION_PAGES} from '@app/shared/app.constants';
import {CommonFunction, ENDPOINTS} from 'src/app/utilities';
import {CustomRouteService} from '@app/core/services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubscriptionListComponent } from '@app/modules/admin/components/subscription-plan/subscription-list/subscription-list.component';

@Component({
    selector: 'app-subscription-plan',
    templateUrl: './subscription-plan.component.html',
    styleUrls: ['./subscription-plan.component.scss']
})

export class SubscriptionPlanComponent implements OnInit, OnDestroy {
    @ViewChild('subscriptionList') subscriptionList: SubscriptionListComponent;

    searchKeyword = '';
    visibleGrid = true;

    private _searchKeywordSubject$: Subject<string> = new Subject<string>();

    private _subscriptions: Subscription = new Subscription();
    routerSubscription: Subscription;

    constructor(private router: Router,
                private customRouteService: CustomRouteService) {
        this._subscribeSearchKeyword();
    }

    ngOnInit() {
		this.routerSubscription = this.customRouteService.currentUrl$.subscribe(url => {
            this.visibleGrid = url === ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN;
        });
	}

	showAddPlan() {
        this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN + `/${ADMIN_SUBSCRIPTION_PAGES.New}`).then();
    }

	ngOnDestroy(): void {
        CommonFunction.unsubscribe([this.routerSubscription, this._subscriptions ]);
	}

    private _subscribeSearchKeyword() {
        this._subscriptions.add(this._searchKeywordSubject$.pipe(
            debounceTime(350),
            distinctUntilChanged()
        ).subscribe((keyword) => {
            this.subscriptionList.searchByText(keyword);
        }));
    }

    onSearchTextBoxKeyPress(e) {
        if (e.event.code === 'Escape' && !!this.searchKeyword != null) {
            this.searchKeyword = '';
            this._searchKeywordSubject$.next(null);
        }
    }

    onSearchSubscriptionPlans(e: any) {
        this.searchKeyword = e.value;
        this._searchKeywordSubject$.next(this.searchKeyword);
    }
}
