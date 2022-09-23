export class AdminAuthResultModel {
	token: string;
	dateExpired: Date;
	adminUser: any;
	loggedId: string;

	public constructor(init?: Partial<AdminAuthResultModel>) {
		Object.assign(this, init);
	}
}
