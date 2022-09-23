export class SwitchingPlanModel {
	accountId: string;
	newPlanId: string;
	isResetTrialDays: boolean

	public constructor(init?: Partial<SwitchingPlanModel>) {
		Object.assign(this, init);
	}
}
