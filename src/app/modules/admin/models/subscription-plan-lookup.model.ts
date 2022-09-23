export class SubscriptionPlanLookupModel {
	id: string;
	name: string;
	isFree: boolean;

	public constructor(init?: Partial<SubscriptionPlanLookupModel>) {
		Object.assign(this, init);
	}
}
