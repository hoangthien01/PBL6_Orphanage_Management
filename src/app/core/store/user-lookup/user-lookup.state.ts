import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, State, StateContext } from '@ngxs/store';
//
import { AppStorage, API_ENDPOINTS } from '@app/utilities';
import { ACCOUNT_ID } from '@app/core/store/user/user.storage';
import { AppFeatureKeys, UserStorage } from '@app/core/store';
import { BaseService } from '@app/core/services/base.service';
import { AssigneeLookupItemModel, CampaignItemModel } from '@app/shared/models';
import * as UserLookupActions from './user-lookup.actions';

export interface IUserLookupState {
    isInit: boolean;
}

const INIT_STATE: IUserLookupState = {
    isInit: false,
};

@State<IUserLookupState>({
    name: AppFeatureKeys.UserLookup,
    defaults: INIT_STATE
})

@Injectable()
export class UserLookupState {

    constructor(private baseService: BaseService) {
    }

    private fetchAssigneesLookup(): Observable<AssigneeLookupItemModel[]> {
        if (!UserStorage.isLoggedIn()) {
            return of([]);
        }
        //
        return of([]);
        // return this.baseService.get<AssigneeLookupItemModel[]>(`${API_ENDPOINTS.USER}/assignees?isUnassignInclude=false`);
    }

    private fetchCampaignLookup(): Observable<CampaignItemModel[]> {
        if (!UserStorage.isLoggedIn()) {
            return of([]);
        }
        //
        const accountId: string = AppStorage.getStorageValue({
            storage: 'session',
            key: ACCOUNT_ID,
        });
        return of([]);
        // return this.baseService.get<CampaignItemModel[]>(`${API_ENDPOINTS.CAMPAIGN}/lookup/${accountId}`);
    }

    //#region All Lookup
    @Action(UserLookupActions.InitLoadUserLookups)
    initUserLookups(context: StateContext<IUserLookupState>) {
        context.patchState({
            isInit: false
        });
    }
    //#endregion
}
