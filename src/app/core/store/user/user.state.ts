import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { cloneDeep } from 'lodash-es';
//
import { AppStorage, ArrayHelper, ENDPOINTS } from '@app/utilities';
import { AppFeatureKeys } from '@app/core/store/app-feature-key.enums';
import {
    UserStorage,
    USER_ID,
    USER_ACCESS_TOKEN,
    TWILIO_CAPABILITY_TOKEN,
    ACCOUNT_EXPERIENCE_SETTINGS,
    USER_EXPERIENCE_SETTINGS,
    USER_PERMISSIONS,
    CUSTOM_FIELDS_SETTINGS,
    ACCOUNT_TIMEZONE,
    ACCOUNT_ID
} from '@app/core/store/user/user.storage';
import * as UserActions from '@app/core/store/user/user.actions';
import { AccountLoggedInModel, AuthResultModel, UserLoggedInModel } from '@app/core/store/models';
import { BaseService } from '@app/core/services';

const INIT_STATE: AuthResultModel = {
    user: null,
    permissions: null,
    profile: null,
    account: null,
    token: null,
};
@State<AuthResultModel>({
    name: AppFeatureKeys.AuthResult,
    defaults: INIT_STATE
})

@Injectable()
export class UserState implements NgxsOnInit {
    constructor(private _router: Router,
                private _baseService: BaseService) {
    }

    //#region OnInitialized
    ngxsOnInit(context: StateContext<AuthResultModel>): void | any {
        if (this.isIgnoredToInitUserInfo()) {
            return;
        }
        // #1 - Handle for clicking on AccountName to switch account but it must opening new Tab
        if (window.location.pathname.startsWith(ENDPOINTS.SWITCH_ACCOUNT)) {
            sessionStorage.clear();
        }
        //
        const userTokenFromLocalStorage: string = localStorage.getItem(USER_ACCESS_TOKEN);
        const userIdFromLocalStorage: string = localStorage.getItem(USER_ID);
        const userPermissionsFromLocalStorage: string = localStorage.getItem(USER_PERMISSIONS);

        //
        if (!!userTokenFromLocalStorage && !!userIdFromLocalStorage) {
            const userTokenFromSessionStorage: string = sessionStorage.getItem(USER_ACCESS_TOKEN);
            //
            if (!userTokenFromSessionStorage) {
                sessionStorage.setItem(USER_ACCESS_TOKEN, userTokenFromLocalStorage);
                sessionStorage.setItem(USER_ID, userIdFromLocalStorage);
                sessionStorage.setItem(USER_PERMISSIONS, userPermissionsFromLocalStorage);
            }
        } else {
            context.dispatch(new UserActions.Logout({
                destroyAllIntegrations: false,
            }));
        }
    }

    isIgnoredToInitUserInfo(): boolean {
        const ignoredRouterUrls: string[] = [
            ENDPOINTS.ADMIN,
            ENDPOINTS.LOGIN,
            ENDPOINTS.SIGN_UP,
            ENDPOINTS.FORGOT_PASSWORD
        ];
        return ignoredRouterUrls.some((url) => window.location.pathname.startsWith(url));
    }
    //#endregion

    //#region
    @Action(UserActions.Logout)
    logout({ dispatch }: StateContext<UserState>, { payload }: UserActions.Logout) {
        if (!!payload && !!payload.isForcedToLogOut) {
            UserStorage.removeSessionStorage();
            UserStorage.removeLocalStorage();
            //
            window.location.href = window.location.origin + '/login';
        }
        //
        if (!!payload && !!payload.navigateToUrl) {
            this._router.navigateByUrl(payload.navigateToUrl).then((isSuccess: boolean) => {
                if (isSuccess) {
                    // // 1 - Destroy Integration
                    // if (!!payload && !!payload.destroyAllIntegrations) {
                    //     this._baseService.deleteDeviceToken();
                    // }
                    // 2 - Clear data in Storage
                    UserStorage.removeSessionStorage();
                    UserStorage.removeLocalStorage();
                    //
                    dispatch(new StateResetAll());
                }
            });
        } else {
            // 1 - Destroy Integration
            // if (!!payload && !!payload.destroyAllIntegrations) {
            //     this._baseService.deleteDeviceToken();
            // }
            // 2 - Clear data in Storage
            UserStorage.removeSessionStorage();
            UserStorage.removeLocalStorage();
            //
            dispatch(new StateResetAll());
        }
    }

    @Action(UserActions.SwitchToAnotherAccount)
    switchToAnotherAccount({ dispatch }: StateContext<UserState>) {
        // dispatch(new StateResetAll(AppLookupState, UserState));
    }
    //#endregion

    //#region Auth Result Handlers
    @Action(UserActions.SetAuthResult)
    setAuthResult(context: StateContext<AuthResultModel>, { payload }: UserActions.SetAuthResult) {
      if (!payload.authResult) {
        context.dispatch(new UserActions.Logout({
          navigateToUrl: ENDPOINTS.LOGIN,
        }));
        return;
      }
      //
      this._storeLoggedUser({
          authResult: payload.authResult,
          setUpNewAuthResultType: payload.setUpNewAuthResultType
      });
      //

      context.patchState({
          user: new UserLoggedInModel({
              ...payload.authResult.profile,
          }),
          // account: new AccountLoggedInModel({
          //     ...payload.authResult.account
          // })
      });
    }

    private _storeLoggedUser(params: { authResult: AuthResultModel; setUpNewAuthResultType: UserActions.SetUpNewAuthResultType }) {
        // sessionStorage.setItem(ACCOUNT_ID, params.authResult.account.id);
        sessionStorage.setItem(USER_ID, params.authResult.profile.id);
        localStorage.setItem(USER_ID, params.authResult.profile.id);
        // Store TokenInfo in SessionStorage and LocalStorage
        switch (params.setUpNewAuthResultType) {
          case UserActions.SetUpNewAuthResultType.Login:
          case UserActions.SetUpNewAuthResultType.SwitchAccount:
          case UserActions.SetUpNewAuthResultType.AutoLogin:
            AppStorage.storeEncodeData({
                storage: 'session',
                key: USER_ACCESS_TOKEN,
                value: params.authResult.token,
                valueType: 'string'
            });
            AppStorage.storeEncodeData({
                storage: 'session',
                key: USER_PERMISSIONS,
                value: params.authResult.permissions,
                valueType: 'array'
            });

            AppStorage.storeEncodeData({
                storage: 'local',
                key: USER_ACCESS_TOKEN,
                value: params.authResult.token,
                valueType: 'string'
            });
            AppStorage.storeEncodeData({
                storage: 'local',
                key: USER_PERMISSIONS,
                value: params.authResult.permissions,
                valueType: 'string'
            });
            break;
        }
    }
    //#endregion

    //#region User
    @Action(UserActions.UpdateUserInfo)
    updateUserInfo(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateUserInfo) {
        context.patchState({
            user: {
                ...context.getState().user,
                ...payload
            }
        });
    }

    @Action(UserActions.UpdateUserAvatar)
    updateUserAvatar(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateUserAvatar) {
        context.patchState({
            user: {
                ...context.getState().user,
                avatar: payload
            }
        });
    }

    @Action(UserActions.UpdateUserName)
    updateUserName(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateUserName) {
        context.patchState({
            user: {
                ...context.getState().user,
                name: payload
            }
        });
    }
    //#endregion

    //#region Account
    @Action(UserActions.UpdateAccountName)
    updateAccountName(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateAccountName) {
        context.patchState({
            account: {
                ...context.getState().account,
                name: payload
            }
        });
    }

    @Action(UserActions.UpdateAccountTimezone)
    updateAccountTimezone(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateAccountTimezone) {
        sessionStorage.setItem(ACCOUNT_TIMEZONE, JSON.stringify(payload));
        //
        context.patchState({
            account: {
                ...context.getState().account,
                timezone: payload.timezone,
                timezoneIana: payload.timezoneIana
            }
        });
    }

    @Action(UserActions.UpdateAccountDefaultPhoneNumberType)
    updateAccountDefaultPhoneNumberType(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateAccountDefaultPhoneNumberType) {
        context.patchState({
            account: {
                ...context.getState().account,
                defaultPhoneNumberType: payload
            }
        });
    }

    @Action(UserActions.UpdateAccountIsRequiredToRegisterA2P)
    updateAccountIsRequiredToRegisterA2P(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateAccountIsRequiredToRegisterA2P) {
        context.patchState({
            account: {
                ...context.getState().account,
                isRequireRegisterA2P10DLC: payload
            }
        });
    }

    @Action(UserActions.UpdateAccountIsOnboarded)
    updateAccountIsOnboarded(context: StateContext<AuthResultModel>, { payload }: UserActions.UpdateAccountIsOnboarded) {
        context.patchState({
            account: {
                ...context.getState().account,
                isOnboarded: payload
            }
        });
    }
    //#endregion

    //#region Actions
    @Action(UserActions.StartOnboarding)
    startOnboarding(context: StateContext<AuthResultModel>) {
        localStorage.setItem(USER_ACCESS_TOKEN, sessionStorage.getItem(USER_ACCESS_TOKEN));
        localStorage.setItem(USER_ID, sessionStorage.getItem(USER_ID));
        localStorage.setItem(TWILIO_CAPABILITY_TOKEN, sessionStorage.getItem(TWILIO_CAPABILITY_TOKEN));
        localStorage.setItem(USER_PERMISSIONS, JSON.stringify(sessionStorage.getItem(USER_PERMISSIONS)));
        //
        this._storeLoggedUser({
            authResult: context.getState(),
            setUpNewAuthResultType: UserActions.SetUpNewAuthResultType.StartOnboarding
        });
    }

    @Action(UserActions.OpenNewTabWithAnotherAccount)
    switchAccountAndOpenNewTab(context: StateContext<AuthResultModel>, { payload }: UserActions.OpenNewTabWithAnotherAccount) {
        if (!payload
            || !payload.authResult
            || !payload.authResult.token
            || !payload.authResult.user) {
            return;
        }

        AppStorage.storeEncodeData({
            storage: 'local',
            key: USER_ACCESS_TOKEN,
            value: payload.authResult.token,
            valueType: 'string'
        });

        // localStorage.setItem(USER_ID, payload.authResult.user.id);
        // AppStorage.storeEncodeData({
        //     storage: 'local',
        //     key: TWILIO_CAPABILITY_TOKEN,
        //     value: payload.authResult.twilioCapabilityToken,
        //     valueType: 'string'
        // });

        AppStorage.storeEncodeData({
            storage: 'local',
            key: USER_PERMISSIONS,
            value: payload.authResult.user.permissions,
            valueType: 'array'
        });
        //
        window.open(`switch-account?${!!payload.forwardUrl ? 'forward=' + payload.forwardUrl : ''}`, '_blank');
    }
    //#endregion
}
