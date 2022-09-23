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
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-user-setting',
	templateUrl: './user-setting.component.html',
	styleUrls: ['./user-setting.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingComponent implements OnInit {
	// currentUser$: Observable<IUser> = this.store.select(AppUserSelector.currentUser);

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

	// themeSetting: UserThemeSettingModel = new UserThemeSettingModel();

	// selectTenant: SwitchTenantModel = new SwitchTenantModel();
	// currentUser: IUser;
	subscription: Subscription = new Subscription();
	isLoading = false;
	selectedTimePause: any;

	isUserMenuVisible = false;

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
	) {}

	ngOnInit(): void {
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
		// this.store.dispatch(new AppLogoutAction());
	}
}
