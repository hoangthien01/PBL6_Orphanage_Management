export class AccountAssignmentModel {
    accountId: string;
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    subscriptionPlanId: string; // For old subscription
    planId: string;
    stripeSubscriptionId: string; // Stripe subscription
    identifierNumber: string;
    trialEndDate: Date;

    constructor(init?: Partial<AccountAssignmentModel>) {
        Object.assign(this, init);
    }
}
