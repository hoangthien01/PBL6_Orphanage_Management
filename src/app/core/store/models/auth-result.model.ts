import { environment } from '@environment';
import { UserRoleType } from '@app/shared/app.enum';
import { PermissionModel } from '@app/shared/models';
import { AVATAR_PROFILE_DEFAULT } from '@app/shared/app.constants';

export interface IBaseAuthResult {
    token?: string;
    dateExpired?: Date;
    loggedId?: string;
    refreshToken?: string;
}

export class AuthResultModel implements IBaseAuthResult {
    // account: AccountLoggedInModel;
    user: UserLoggedInModel;
    profile: UserLoggedInModel;
    permissions: string;
    email: string;
    token: string;
    dateExpired?: Date;
    loggedId?: string;
    refresh_token?: string;
    avatar: string;

    public constructor(init?: Partial<AuthResultModel>) {
        Object.assign(this, init);
    }
}

export class AccountLoggedInModel {
    id: string;
    name: string;
    email: string;
    avatar: string;
    //
    defaultPhoneNumberType: string;
    //
    timezone: string;
    timezoneIana: string;
    // Subscriptions
    expiredAt: Date;
    //
    isActivated: boolean;
    isOnboarded: boolean;
    isRequireRegisterA2P10DLC: boolean;
    // Twilio Settings
    twilioCapabilityToken: string;

    public constructor(init?: Partial<AccountLoggedInModel>) {
        Object.assign(this, init);
    }
}

export class UserLoggedInModel {
    id: string;
    accountId: string;
    name: string;
    email: string;
    avatar: string;
    //
    role: UserRoleType;
    // permissions: PermissionModel[];
    permissions: string;
    //
    isOwner: boolean;
    isInvited: boolean;
    hasMultipleAccounts: boolean;
    isOnlyAssignedData: boolean;
    // Settings
    settings: { name: string; value: string }[];

    public constructor(init?: Partial<UserLoggedInModel>) {
        Object.assign(this, init);
    }

    public static getUserAvatarUrl(avatarId: string): string {
      // TODO:
      return 'todo'
        // return !!avatarId
        //     ? environment.avatarUrl + '/' + avatarId
        //     : environment.avatarUrl + '/' + AVATAR_PROFILE_DEFAULT;
    }
}

// Handle for reloading behavior in order to get User Info again
export class AuthResultReloadModel {
    account: AccountInfoReloadModel;
    user: UserInfoReloadModel;

    public constructor(init?: Partial<AuthResultModel>) {
        Object.assign(this, init);
    }
}

export class AccountInfoReloadModel {
    id: string;
    name: string;
    email: string;
    avatar: string;
    //
    defaultPhoneNumberType: string;
    //
    timezone: string;
    timezoneIana: string;
    // NOTE: In AccountLoggedModel, we temporarily use "subscription - without 's'"
    expiredAt: Date;
    //
    isOnboarded: boolean;
    isRequireRegisterA2P10DLC: boolean;

    public constructor(init?: Partial<AccountInfoReloadModel>) {
        Object.assign(this, init);
    }
}


export class UserInfoReloadModel {
    id: string;
    name: string;
    email: string;
    avatar: string;
    //
    role: UserRoleType;
    //
    isOnlyAssignedData: boolean;
    // Settings
    settings: { name: string; value: string }[];

    public constructor(init?: Partial<UserInfoReloadModel>) {
        Object.assign(this, init);
    }
}
