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
    public static userAvatar(state: AuthResultModel): string {
        return !!state && state.user && state.user.avatar
            ? state.user.avatar
            : AVATAR_PROFILE_DEFAULT;
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

    //#region Account
    @Selector([UserState])
    public static accountId(state: AuthResultModel): string {
        return !!state && state.account ? state.account.id : '';
    }

    @Selector([UserState])
    public static accountName(state: AuthResultModel): string {
        return !!state && state.account ? state.account.name : '';
    }

    @Selector([UserState])
    public static defaultPhoneNumberType(state: AuthResultModel): string {
        return !!state && state.account ? state.account.defaultPhoneNumberType : null;
    }
    //#endregion

    @Selector([UserState])
    public static isAccountOnboarded(state: AuthResultModel): boolean {
        return !!state && state.account ? state.account.isOnboarded : false;
    }
    //#endregion

    //#region A2P Handler
    @Selector([UserState])
    public static isAccountLockedDueToRequiringRegisterA2P10DLC(state: AuthResultModel): boolean {
        /**
         * phoneNumber.length >= 1 && !isA2P10DLCRegistered
         */
        return !!state && state.account ? state.account.isRequireRegisterA2P10DLC : false;
    }
    //#endregion

    //#region Helper
    @Selector([UserState])
    public static processRoutingAfterLoggedIn(state: AuthResultModel): string {
        if (!state || !state.account || !state.user) {
            return null;
        }
        //
        if (state.user.role === UserRoleType.User) {
            return ENDPOINTS.MANAGE_ACCOUNT;
        } else {
            return ENDPOINTS.SETTING_BILLING_CARD;
        }

        if (!this.isAccountOnboarded(state)) {
            return ENDPOINTS.ONBOARDING;
        }

        // A2P-10DLC
        if (!!this.isAccountLockedDueToRequiringRegisterA2P10DLC(state)) {
            return ENDPOINTS.SETTING_ACCOUNT_INFO;
        }
        //
        return null;
    }
    //#endregion
}
