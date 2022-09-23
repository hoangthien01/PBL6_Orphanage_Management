import {Currency} from '@app/shared/app.enum';

export class SubscriptionPlanModel {
	public id: string;
	public name: string;
	public baseCharge: number  ;
	public localNumber: number;
	public localMinute: number;
	public email: number;
	public sms: number;
	public additionalLocalNumberCost: number;
	public additionalLocalMinuteCost: number;
	public additionalEmailCost: number;
	public additionalTollFreeCost: number;
	public additionalTollFreeMinuteCost: number;
	public additionalSMSCost: number;
	public additionalMmsCost: number;
	public isDefault: boolean;
	public isFree: boolean;
	public isSystem: boolean;
	public currency: string;

	public lookup: number;
	public additionalLookupCost: number;
	// For trial
	public trialDays: number;
	public trialNumbers: number;
	public trialLocalMinutes: number;
	public trialSMS: number;
	public trialEmails: number;
	public trialExtendedDays: number;
	public paymentExtendedDays: number;

	public constructor(init?: Partial<SubscriptionPlanModel>) {
		this.baseCharge = 0;
		this.localNumber = 0;
		this.localMinute = 0;
		this.email = 0;
		this.sms = 0;
		this.additionalLocalNumberCost = 0;
		this.additionalLocalMinuteCost = 0;
		this.additionalEmailCost = 0;
		this.additionalTollFreeCost = 0;
		this.additionalTollFreeMinuteCost = 0;
		this.additionalSMSCost = 0;
		this.additionalMmsCost = 0;

		this.lookup = 0;
		this.additionalLookupCost = 0;
		// For trial
		this.trialDays = 0;
		this.trialNumbers = 0;
		this.trialLocalMinutes = 0;
		this.trialSMS = 0;
		this.trialEmails = 0;
		this.trialExtendedDays = 0;
		this.paymentExtendedDays = 0;
		this.currency = Currency.USD;
		Object.assign(this, init);
	}
}
