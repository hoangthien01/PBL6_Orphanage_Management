
export class AccountModel {
    id: string;
    name: string;
    companyName: string;
    email: string;
    identifierNumber: string;
    companyEmail: string;
    avatar: any;
    avatarImg: any;
    timezone: string;
    country: string;
    // For UI
    isChanged: boolean;
    isSaving: boolean;

    public constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }
}

export class RegisteredAccountModel {
    name: string;
    companyName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isSaving: boolean;

    // First Promoter VisitorID
    fpVisitorId: string;

    public constructor(init?: Partial<RegisteredAccountModel>) {
        Object.assign(this, init);
    }
}

export class ActivateAccountModel {
    userId: string;
    token: string;

    public constructor(init?: Partial<ActivateAccountModel>) {
        Object.assign(this, init);
    }
}

export class ManagedAccount {
    accountId: string;
    identifierNumber: number;
    isOwner: boolean;
    role: string;
    campaignIds: string[];
    permissions: any[];

    // for managed account list
    name: string;
    address: string;
    email: string;
    isActivated: boolean;
    isAccessGranted: boolean;
    isSwitching: boolean;
    isInvited: boolean;

    public constructor(init?: Partial<ManagedAccount>) {
        Object.assign(this, init);
    }
}

export class AddManagedAccount {
    fullName: string;
    companyName: string;
    email: string;
    timezone: string;
    isSomeOneElse: boolean;
    // For UI
    isSaving: boolean;

    public constructor(init?: Partial<AddManagedAccount>) {
        Object.assign(this, init);
    }
}
