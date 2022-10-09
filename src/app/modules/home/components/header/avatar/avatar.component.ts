import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
//
import {ENDPOINTS} from 'src/app/utilities/endpoints';
import { UserLoggedInModel } from '@app/core/store/models';
import * as UserActions from '@app/core/store/user/user.actions';
import { UserSelectors } from '@app/core/store';

@Component({
    selector: 'app-header-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnDestroy {
    // userAvatar$: Observable<string> = this._store.select<string>(UserSelectors.userAvatar);
    // userLogged$: Observable<UserLoggedInModel> = this._store.select<UserLoggedInModel>(UserSelectors.userLogged);
    // isUserInNormalUserRole$: Observable<boolean> = this._store.select<boolean>(UserSelectors.isUserInNormalUserRole);
    // accountName$: Observable<string> = this._store.select<string>(UserSelectors.accountName);

    @Input() isHideLogoutMenu: boolean;

    currentAccount: { userName?: string; avatar?: string; accountName?: string; defaultAvatarUrl?: string } = {};
    moreMenuVisible: boolean;

    isNormalUser: boolean;

    private _subscriptions: Subscription = new Subscription();

    constructor(private router: Router,
                private _store: Store) {
        // this._subscriptions.add(this.isUserInNormalUserRole$.subscribe((isNormalUser: boolean) => {
        //     this.isNormalUser = isNormalUser;
        // }));

        this._subscribeUserLogged();
    }

    ngOnInit() {
        // this.getAccount();
        // this._subscriptions.add(this.accountName$.subscribe((accountName: string) => {
        //     if (this.currentAccount) {
        //         this.currentAccount.accountName = accountName;
        //     }
        // }));
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    logout() {
        this.moreMenuVisible = false;
        this._store.dispatch(new UserActions.Logout({
            destroyAllIntegrations: true,
            navigateToUrl: `auth/login`
        }));
    }

    toSettingPage() {
        this.moreMenuVisible = false;
        const manageAccountPath = '/manage-accounts';
        const billingCardPath = '/setting/billing/card';
        const urlAllowed = [manageAccountPath, billingCardPath];
    }

    toManageAccountPage() {
        this.moreMenuVisible = false;
        this.router.navigate(['manage-accounts']).then();
    }

    onToggleMoreMenu() {
        this.moreMenuVisible = !this.moreMenuVisible;
    }

    toHelpCenterPage() {
        this.moreMenuVisible = false;
        // window.open(`${ENDPOINTS.HELP_CENTER}/`, '_blank');
    }

    //#region Subscribe - UserLogged
    private _subscribeUserLogged() {
    //     this._subscriptions.add(this.userLogged$.subscribe((userLogged: UserLoggedInModel) => {
    //         this.currentAccount.userName = userLogged.name;
    //         this.currentAccount.avatar = UserLoggedInModel.getUserAvatarUrl(userLogged.avatar);
    //     }));
    }
    //#endregion
}
