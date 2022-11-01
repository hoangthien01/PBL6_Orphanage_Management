import { Selector } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
//
import {
    AVATAR_PROFILE_DEFAULT
} from '@app/shared/app.constants';
import { ENDPOINTS } from '@app/utilities';
import { UserState } from './user.state';
import { UserRoleType } from '@app/shared/app.enum';
import { AuthResultModel, UserLoggedInModel } from '@app/core/store/models';

export class UserSelectors {
    //#region User
    @Selector([UserState])
    public static userLogged(state: AuthResultModel): UserLoggedInModel {
        return !!state && state.user ? cloneDeep(state.user) : new UserLoggedInModel();
    }

    @Selector([UserState])
    public static userName(state: AuthResultModel): string {
        return !!state && state.user && state.user.name
            ? state.user.name
            : '';
    }

    @Selector([UserState])
    public static userId(state: AuthResultModel): string {
        return !!state && state.user && state.user.name
            ? state.user.id
            : '';
    }

    @Selector([UserState])
    public static userAvatar(state: AuthResultModel): string {
        return !!state && state.user && state.user.avatar
            ? state.user.avatar : ''
            // : AVATAR_PROFILE_DEFAULT;
    }

    @Selector([UserState])
    public static userRole(state: AuthResultModel): UserRoleType {
        return !!state && state.user && state.user.role
            ? state.user.role
            : UserRoleType.User;
    }

    @Selector([UserState])
    public static isUserInAdminRole(state: AuthResultModel): boolean {
        return !!state && state.user && state.user.role
            ? state.user.role === UserRoleType.Admin
            : false;
    }

    @Selector([UserState])
    public static isUserInNormalUserRole(state: AuthResultModel): boolean {
        return !!state && state.user && state.user.role
            ? state.user.role === UserRoleType.User
            : false;
    }

    /** TODO: These do not support for reloading cases - UserInfoReloadModel
    @Selector([UserState])
    public static isUserInAdminOwnerRole(state: AuthResultModel): boolean {
        return !!state && state.user && state.user.role
            ? state.user.role === UserRoleType.Admin && state.user.isOwner
            : false;
    }

    @Selector([UserState])
    public static isUserInInvitedUserRole(state: AuthResultModel): boolean {
        return !!state && state.user && state.user.role
            ? state.user.role === UserRoleType.User && state.user.isInvited
            : false;
    }*/

    @Selector([UserState])
    public static isOnlyAssignedData(state: AuthResultModel): boolean {
        return !!state && state.user ? !!state.user.isOnlyAssignedData : false;
    }
    //#endregion

    //#region Helper
    @Selector([UserState])
    public static processRoutingAfterLoggedIn(state: AuthResultModel): string {
        if (!state || !state.user) {
            return null;
        }
        //
        if (state.user.role === UserRoleType.User) {
            return ENDPOINTS.MANAGE_ACCOUNT;
        } else {
            return ENDPOINTS.SETTING_BILLING_CARD;
        }
        //
        return null;
    }
    //#endregion
}
