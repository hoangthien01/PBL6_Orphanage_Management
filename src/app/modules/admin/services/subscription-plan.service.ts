import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SubscriptionPlanModel} from '@app/modules/admin/models/subscription-plan.model';
import {ListItemModel} from '@app/shared/models';
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';
import {SubscriptionPlanLookupModel} from '@app/modules/admin/models/subscription-plan-lookup.model';
import {BaseService} from '@app/core/services';

@Injectable()
export class SubscriptionPlanService {
	private subscriptionPlanURL = 'api/subscriptionplan';
	private refreshGrid = new EventEmitter<SubscriptionPlanModel>(null);

	constructor(private adminBaseService: AdminBaseService, private baseService: BaseService) {
	}

	raiseRefreshGrid(plan: SubscriptionPlanModel) {
		this.refreshGrid.emit(plan);
	}

	subscribeRaiseRefreshGrid(next?: (value: SubscriptionPlanModel) => void, error?: (error: any) => void, complete?: () => void): Subscription {
		return this.refreshGrid.asObservable().subscribe(next, error, complete);
	}

	getSubscriptionPlans(): Observable<SubscriptionPlanModel[]> {
		return this.adminBaseService.get(`${this.subscriptionPlanURL}`);
	}

	getListItemPlan(): Observable<SubscriptionPlanLookupModel[]> {
		return this.adminBaseService.get(`${this.subscriptionPlanURL}/source/`);
	}

	get(planId: string): Observable<SubscriptionPlanModel> {
		return this.adminBaseService.get(`${this.subscriptionPlanURL}/${planId}`);
	}

	update(subscriptionPlan: SubscriptionPlanModel): Observable<boolean> {
		return this.adminBaseService.put(`${this.subscriptionPlanURL}`, subscriptionPlan);
	}

	add(subscriptionPlan: SubscriptionPlanModel): Observable<string> {
		return this.adminBaseService.post(`${this.subscriptionPlanURL}`, subscriptionPlan);
	}

	delete(id: string) {
		return this.adminBaseService.delete(`${this.subscriptionPlanURL}/${id}`);
	}

	assign(accountId: string, planId: string): Observable<boolean> {
		const data = new ListItemModel<string, string>();
		data.key = accountId;
		data.value = planId;
		return this.adminBaseService.post(`${this.subscriptionPlanURL}/assign`, data);
	}

	checkNameIsUnique(name: string): Observable<boolean> {
		return this.adminBaseService.get(`${this.subscriptionPlanURL}/name/exist/${name}`);
	}

	getDefaultTrialDays(): Observable<number> {
		return this.baseService.get(`${this.subscriptionPlanURL}/default/trials`);
	}

	getSubscriptionDefault(): Observable<SubscriptionPlanModel> {
		return this.baseService.get(`${this.subscriptionPlanURL}/default`);
	}
}
