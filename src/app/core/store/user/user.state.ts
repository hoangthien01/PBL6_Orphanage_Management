import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { cloneDeep } from 'lodash-es';
//
import { AppStorage, ArrayHelper, ENDPOINTS, StringHelper } from '@app/utilities';
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
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

const INIT_STATE: AuthResultModel = {
    user: null,
    permissions: null,
    profile: null,
    token: null,
    email: null,
    avatar: null,
};
@State<AuthResultModel>({
    name: AppFeatureKeys.AuthResult,
    defaults: INIT_STATE
})

@Injectable()
export class UserState implements NgxsOnInit {
    constructor(private _router: Router,
        private _baseService: BaseService,
        private _permissionsService: NgxPermissionsService) {
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
        this._permissionsService.flushPermissions();
        dispatch(new StateResetAll());
        if (!!payload && !!payload.isForcedToLogOut) {
            UserStorage.removeSessionStorage();
            UserStorage.removeLocalStorage();
            dispatch(new StateResetAll());
            //
            window.location.href = window.location.origin + '/auth/login';
        }
        //
        if (!!payload && !!payload.navigateToUrl) {
            this._router.navigateByUrl(payload.navigateToUrl).then((isSuccess: boolean) => {
                if (isSuccess) {
                    // 2 - Clear data in Storage
                    UserStorage.removeSessionStorage();
                    UserStorage.removeLocalStorage();
                    //
                    dispatch(new StateResetAll());
                }
            });
        } else {
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
        // ngx-permissions
        let scope = new Map();
        let ori_data = payload.authResult.permissions.split(' ');
        ori_data.forEach((item) => {
            if (!item || item == '') {
                return;
            }
            let data = item.split(':');
            if (scope.has(data[0])) {
                scope.get(data[0]).push(data[1]);
            } else {
                scope.set(data[0], new Array(data[1]));
            }
        })
        for (let [key, value] of scope) {
            // this._ngxRolesService.addRole(key, value);
            this._permissionsService.addPermission(value);
        }
        // console.log('NgxRoles', this._ngxRolesService.getRoles());
        console.log('Permissions', this._permissionsService.getPermissions());

        context.patchState({
            user: new UserLoggedInModel({
                ...payload.authResult.profile,
                permissions: payload.authResult.permissions,
                email: payload.authResult.email,
                avatar: payload.authResult.avatar,
            }),
            avatar: payload.authResult.avatar,
        });
        // reload to admin home if user reload page and level is admin
        if (payload.setUpNewAuthResultType === UserActions.SetUpNewAuthResultType.ReloadPage) {
            // window.location.href = window.location.origin + '/admin/home';
            // this._router.navigateByUrl('/admin');
        }
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

    @Action(UserActions.SetAccountIsRegisterd)
    setIsRegisteredInfo(context: StateContext<AuthResultModel>, { payload }: UserActions.SetAccountIsRegisterd) {
        context.patchState({
            user: {
                ...context.getState().user,
                is_vip_donor: payload,
            }
        });
    }
    //#endregion

    //#region Actions
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
