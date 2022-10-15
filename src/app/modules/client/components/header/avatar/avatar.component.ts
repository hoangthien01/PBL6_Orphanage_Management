import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
//
import {ENDPOINTS} from 'src/app/utilities/endpoints';
import {ProfileGeneralInfoModel} from '@app/modules/account-setting/models';
import { UserLoggedInModel } from '@app/core/store/models';
import * as UserActions from '@app/core/store/user/user.actions';
import { UserSelectors, UserStorage } from '@app/core/store';

@Component({
    selector: 'app-header-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnDestroy {
    userAvatar$: Observable<string> = this._store.select<string>(UserSelectors.userAvatar);
    userLogged$: Observable<UserLoggedInModel> = this._store.select<UserLoggedInModel>(UserSelectors.userLogged);
    isUserInNormalUserRole$: Observable<boolean> = this._store.select<boolean>(UserSelectors.isUserInNormalUserRole);
    accountName$: Observable<string> = this._store.select<string>(UserSelectors.userName);

    @Input() isHideLogoutMenu: boolean;

    currentAccount: { userName?: string; avatar?: string; accountName?: string; defaultAvatarUrl?: string } = {};
    moreMenuVisible: boolean;

    isMobile: boolean;
    isNormalUser: boolean;
    isAccountLocked: boolean = false;
    isAccountLockedDueToRequiringRegisterA2P10DLC: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    constructor(private router: Router,
                private _store: Store) {
        //
        this._subscribeUserLogged();
    }

    ngOnInit() {
        // this.getAccount();
        this._subscriptions.add(this.accountName$.subscribe((accountName: string) => {
            if (this.currentAccount) {
                this.currentAccount.accountName = accountName;
            }
        }));
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    logout() {
        this.moreMenuVisible = false;
        this._store.dispatch(new UserActions.Logout({
            destroyAllIntegrations: true,
            navigateToUrl: ENDPOINTS.LOGIN
        }));
    }

    toSettingPage() {
        this.moreMenuVisible = false;
        const manageAccountPath = '/manage-accounts';
        const billingCardPath = '/setting/billing/card';
        const urlAllowed = [manageAccountPath, billingCardPath];

        if (this.isAccountLocked && (window.location.pathname === manageAccountPath
            || window.location.pathname === billingCardPath
            || urlAllowed.indexOf(window.location.pathname) < 0)) {
            this.router.navigate(['/setting/billing/card']).then();
        } else {
            this.router.navigate(['setting']).then();
        }
    }

    toManageAccountPage() {
        this.moreMenuVisible = false;
        const commands = !this.isMobile ? 'manage-accounts' : 'mobile/manage-accounts';
        this.router.navigate([commands]).then();
    }

    onToggleMoreMenu() {
        this.moreMenuVisible = !this.moreMenuVisible;
    }

    // toHelpCenterPage() {
    //     this.moreMenuVisible = false;
    //     window.open(`${ENDPOINTS.HELP_CENTER}/`, '_blank');
    // }

    //#region Subscribe - UserLogged
    private _subscribeUserLogged() {
        this._subscriptions.add(this.userLogged$.subscribe((userLogged: UserLoggedInModel) => {
            this.currentAccount.userName = userLogged.name;
            this.currentAccount.avatar = UserLoggedInModel.getUserAvatarUrl(userLogged.avatar);
        }));
    }

    //#endregion
}
