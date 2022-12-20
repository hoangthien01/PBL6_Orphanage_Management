import { AuthResultModel, UserLoggedInModel } from '../models/auth-result.model';

export enum UserActionType {
    LOGOUT = '[Auth] Logout',
    SWITCH_TO_ANOTHER_ACCOUNT = '[Auth] Switch To Another Account',
    //
    SET_AUTH_RESULT = '[Auth] Set Auth Result',
    // User
    SET_USER_INFO = '[User] Set Info',
    UPDATE_USER_INFO = '[User] Update Info',
    UPDATE_USER_AVATAR = '[User] Update Avatar',
    UPDATE_USER_NAME = '[User] Update Name',
    UPDATE_USER_CUSTOM_FIELDS = '[User] Update Custom Fields',
    ADD_USER_CUSTOM_FIELDS = '[User] Add Custom Fields',
    // Account
    UPDATE_ACCOUNT_NAME = '[Account] Update Name',
    UPDATE_ACCOUNT_TIMEZONE = '[Account] Update Timezone',
    UPDATE_ACCOUNT_DEFAULT_PHONE_NUMBER_TYPE = '[Account] Update Default Phone Number Type',
    UPDATE_ACCOUNT_SUBSCRIPTION = '[Account] Update Subscription',
    UPDATE_ACCOUNT_IS_REQUIRED_TO_REGISTER_A2P = '[Account] Update isRequireRegisterA2P10DLC',
    UPDATE_ACCOUNT_IS_ONBOARDED = '[Account] Update isOnboarded',
    // Actions
    START_ONBOARDING = '[Account] Start Onboarding',
    OPEN_NEW_TAB_WITH_ANOTHER_ACCOUNT = '[Account] Open New Tab With Another Account',
    SET_IS_REGISTERED_INFO = '[Account] Set Is Register'
}

export enum SetUpNewAuthResultType {
    Login = 'login',
    SwitchAccount = 'switchAccount',
    ReloadPage = 'reloadPage',
    AutoLogin = 'autoLogin',
    StartOnboarding = 'startOnboarding'
}

export class Logout {
    static readonly type = UserActionType.LOGOUT;

    constructor(public readonly payload?: {
        destroyAllIntegrations?: boolean;
        navigateToUrl?: string;
        isForcedToLogOut?: boolean;
    }) {
    }
}

export class SwitchToAnotherAccount {
    static readonly type = UserActionType.SWITCH_TO_ANOTHER_ACCOUNT;

    constructor() {
    }
}

export class SetAuthResult {
    static readonly type = UserActionType.SET_AUTH_RESULT;

    constructor(public readonly payload: {
        authResult: AuthResultModel;
        setUpNewAuthResultType: SetUpNewAuthResultType;
    }) {
    }
}

/**
 * User Handler
 */
export class UpdateUserInfo {
    static readonly type = UserActionType.UPDATE_USER_INFO;

    constructor(public readonly payload: Partial<UserLoggedInModel>) {
    }
}

export class UpdateUserAvatar {
    static readonly type = UserActionType.UPDATE_USER_AVATAR;

    constructor(public readonly payload: string) {
    }
}

export class UpdateUserName {
    static readonly type = UserActionType.UPDATE_USER_NAME;

    constructor(public readonly payload: string) {
    }
}

/**
 * Account Handler
 */
export class UpdateAccountName {
    static readonly type = UserActionType.UPDATE_ACCOUNT_NAME;

    constructor(public readonly payload: string) {
    }
}

export class UpdateAccountTimezone {
    static readonly type = UserActionType.UPDATE_ACCOUNT_TIMEZONE;

    constructor(public readonly payload: Partial<{ timezone: string; timezoneIana: string }>) {
    }
}

export class UpdateAccountDefaultPhoneNumberType {
    static readonly type = UserActionType.UPDATE_ACCOUNT_DEFAULT_PHONE_NUMBER_TYPE;

    constructor(public readonly payload: string) {
    }
}

export class UpdateAccountIsRequiredToRegisterA2P {
    static readonly type = UserActionType.UPDATE_ACCOUNT_IS_REQUIRED_TO_REGISTER_A2P;

    constructor(public readonly payload: boolean) {
    }
}

export class UpdateAccountIsOnboarded {
    static readonly type = UserActionType.UPDATE_ACCOUNT_IS_ONBOARDED;

    constructor(public readonly payload: boolean) {
    }
}

export class SetAccountIsRegisterd {
    static readonly type = UserActionType.SET_IS_REGISTERED_INFO;

    constructor(public readonly payload: boolean) {
    }
}


/**
 * Actions
 */
export class StartOnboarding {
    static readonly type = UserActionType.START_ONBOARDING;

    constructor() {
    }
}

export class OpenNewTabWithAnotherAccount {
    static readonly type = UserActionType.OPEN_NEW_TAB_WITH_ANOTHER_ACCOUNT;

    constructor(public readonly payload: { authResult: AuthResultModel; forwardUrl?: string }) {
    }
}

export type UserActions =
    | Logout
    | SwitchToAnotherAccount
    | SetAuthResult
    | UpdateUserInfo
    | UpdateUserAvatar
    | UpdateUserName
    | UpdateAccountName
    | UpdateAccountTimezone
    | UpdateAccountDefaultPhoneNumberType
    | UpdateAccountIsRequiredToRegisterA2P
    | UpdateAccountIsOnboarded
    | StartOnboarding
    | SetAccountIsRegisterd
    | OpenNewTabWithAnotherAccount;
