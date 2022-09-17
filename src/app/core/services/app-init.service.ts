import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
//
import { ENDPOINTS, PageUrlHelper } from '@app/utilities';
import { BaseService } from '@app/core/services/base.service';
import { UserStorage } from '@app/core/store';
import * as UserActions from '@app/core/store/user/user.actions';
import { AuthResultModel, AuthResultReloadModel, UserLoggedInModel, AccountLoggedInModel } from '@app/core/store/models';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(private _store: Store,
                private _baseService: BaseService) {
    }

    async initApp(): Promise<boolean> {
        const pathname: string = window.location.pathname;
        // 1 - is Admin Page
        if (pathname.startsWith(ENDPOINTS.ADMIN)) {
            return Promise.resolve(true);
        }
        //
        if (PageUrlHelper.isUrlThatWeMustRemoveUserInfo(pathname)) {
            this._logOut();
            //
            return Promise.resolve(true);
        }
        //
        if (!!UserStorage.isLoggedIn()) {
            return this._getAPIsInitialized();
        } else {
            this._logOut();
            return Promise.resolve(true);
        }
    }

    private _getAPIsInitialized(params?: { navigateToUrl?: string }): Promise<boolean> {
        return Promise.all([
            this._baseService.get<AuthResultReloadModel>('api/user/auth/reload').toPromise(),
        ]).then(([authResult]) => {
            if (!authResult || !authResult.account || !authResult.user) {
                this._logOut();
                return true;
            }
            //
            this._store.dispatch(new UserActions.SetAuthResult({
                authResult: new AuthResultModel({
                    account: new AccountLoggedInModel({
                        id: authResult.account.id,
                        name: authResult.account.name,
                        email: authResult.account.email,
                        avatar: authResult.account.avatar,
                        //
                        defaultPhoneNumberType: authResult.account.defaultPhoneNumberType,
                        //
                        timezone: authResult.account.timezone,
                        timezoneIana: authResult.account.timezoneIana,
                        //
                        expiredAt: authResult.account.expiredAt,
                        //
                        isOnboarded: authResult.account.isOnboarded,
                        isRequireRegisterA2P10DLC: authResult.account.isRequireRegisterA2P10DLC,
                    }),
                    user: new UserLoggedInModel({
                        ...authResult.user,
                    })
                }),
                setUpNewAuthResultType: UserActions.SetUpNewAuthResultType.ReloadPage,
            }));
            return true;
        }).catch(() => {
            this._logOut();
            return Promise.resolve(true);
        });
    }

    private _logOut(params?: { navigateToUrl?: string }) {
        this._store.dispatch(new UserActions.Logout({ navigateToUrl: !!params ? params.navigateToUrl : '' }));
    }
}
