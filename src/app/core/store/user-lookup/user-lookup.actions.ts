import { IUserLookupState } from './user-lookup.state';
import { CampaignItemModel, ListItemModel } from '@app/shared/models';

export enum UserLookupActionType {
    INIT_USER_LOOKUPS = '[User Lookup] Init',
    //
    LOAD_USER_LOOKUPS = '[User Lookup] Load All',
    LOAD_USER_LOOKUPS_SUCCESS = '[User Lookup] Load All Success',
    SET_USER_LOOKUPS = '[User Lookup] Set All',
    GET_USER_LOOKUPS = '[User Lookup] Get All',
    CLEAR_USER_LOOKUPS = '[User Lookup] Clear All',
}

export class InitLoadUserLookups {
    static readonly type = UserLookupActionType.INIT_USER_LOOKUPS;

    constructor() {
    }
}

export class LoadUserLookups {
    static readonly type = UserLookupActionType.LOAD_USER_LOOKUPS;

    constructor(public payload?: { accountId: string }) {
    }
}

export class LoadUserLookupsSuccess {
    static readonly type = UserLookupActionType.LOAD_USER_LOOKUPS_SUCCESS;

    constructor(public payload: IUserLookupState) {
    }
}

export class SetUserLookups {
    static readonly type = UserLookupActionType.SET_USER_LOOKUPS;

    constructor(public payload: {
        assignees: ListItemModel<string, string>[];
        campaigns: CampaignItemModel[];
    }) {
    }
}

export class ClearUserLookups {
    static readonly type = UserLookupActionType.CLEAR_USER_LOOKUPS;

    constructor() {
    }
}

export type UserLookupActions =
    | InitLoadUserLookups
    | LoadUserLookups
    | LoadUserLookupsSuccess
    | SetUserLookups
    | ClearUserLookups;
