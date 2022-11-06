import { Router } from '@angular/router';
import { UserLoggedInModel } from '@app/core/store/models';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { UserSelectors, UserState } from '@app/core/store';
import { POPUP_ANIMATION_DEFAULT } from '@app/shared/app.constants';
import * as UserActions from '@app/core/store/user/user.actions';
import { ENDPOINTS } from '@app/utilities';

@Component({
	selector: 'app-user-setting',
	templateUrl: './user-setting.component.html',
	styleUrls: ['./user-setting.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingComponent implements OnInit {
  @Select(UserSelectors.userLogged) userLogged$: Observable<UserLoggedInModel>;
  @Select(UserSelectors.userAvatar) userAvatar$: Observable<string>;

	private _isDarkThemeSelected = false;

	@Input() isCompacted: boolean;

	@Input()
	get isDarkThemeSelected(): boolean {
		return this._isDarkThemeSelected;
	}

	set isDarkThemeSelected(value: boolean) {
		this._isDarkThemeSelected = value;
		this.isDarkThemeSelectedChange.emit(value);
	}

	@Output() isDarkThemeSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  POPUP_ANIMATION_DEFAULT = POPUP_ANIMATION_DEFAULT;

	// themeSetting: UserThemeSettingModel = new UserThemeSettingModel();
	currentUser: UserLoggedInModel;
	subscription: Subscription = new Subscription();
  userAvatar: string;
  //
	isLoading = false;
	selectedTimePause: any;
	isUserMenuVisible = false;
  //
	positionTimePausePopover: any = {
		my: 'top left',
		at: 'bottom right',
		collision: 'fit flip',
	};
	selectedTenantElement: Element;
	switchTenantConfirmBoxVisible = false;

	constructor(
		private store: Store,
		private cdr: ChangeDetectorRef,
    private router: Router
	) {}

	ngOnInit(): void {
        this.subscription.add(this.userLogged$.subscribe((res) => {
          this.currentUser = res;
          this.cdr.detectChanges();
        }));

    // this.subscription.add(this.userAvatar$.subscribe((res) => {
    //   this.userAvatar = res;
    //   console.log('this.userAvatar', this.userAvatar);

    // }));
	}

	checkChanges() {
		this.cdr.detectChanges();
	}

	showUserMenu(event: Event): void {
		if (!event) {
			return;
		}
		this.isUserMenuVisible = !this.isUserMenuVisible;
	}

	onUpgradeServicePack(): void {
		// TODO
	}

	setThemeSetting(): void {
		// if (this.themeSetting.theme == 'Dark') {
		// 	this.isDarkThemeSelected = true;
		// }
		// if (this.themeSetting.theme == 'Light') {
		// 	this.isDarkThemeSelected = false;
		// }
		// Theme
		// document.getElementsByTagName('body')[0].classList.add(this.themeSetting.theme);

		this.checkChanges();
	}

	changeTheme(event: { value: boolean }): void {
		if (event.value === true) {
			// this.themeSetting.theme = 'Dark';

			// this.navbarService.updateUserThemeSetting(this.themeSetting).subscribe();
		} else {
			// this.themeSetting.theme = 'Light';

			// this.navbarService.updateUserThemeSetting(this.themeSetting).subscribe();
		}
	}

	openAccountSettingPopup(): void {
		this.isUserMenuVisible = !this.isUserMenuVisible;
	}

	// getUserGeneralSetting(): void {
	// 	this.navbarService.getUserGeneralSetting().subscribe(val => {
	// 		this.userPreferenceGeneral = val;
	// 		this.themeSetting.theme = this.userPreferenceGeneral.theme;
	// 		this.notificationSetting.turnedOff = this.userPreferenceGeneral.turnedNotificationOff;
	// 		this.setThemeSetting();
	// 	});
	// }

	logout(): void {
		this.isUserMenuVisible = false;
    //
    this.store.dispatch(new UserActions.Logout({
        destroyAllIntegrations: true,
        navigateToUrl: 'auth/login'
    }));
	}

  goToManageRolePage(): void {
    this.router.navigate([ENDPOINTS.MANAGE_ROLE_PAGE]).then();
  }

  goToProfile(): void {
    this.isUserMenuVisible = false
    this.router.navigate([ENDPOINTS.PROFILE]).then();
  }
}
