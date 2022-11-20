import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//
// import { Utility } from '@apps/shared/utilities';

import { INavBarItem } from '@app/shared/models';
// import { fadeInEnterOnlyAnimation, growAnimation } from '@cleeksy/shared/configurations/common';
// import { ToggleNavbar } from '@cleeksy/shared/data-access/app-ui-state';

@Component({
	selector: 'app-side-navigation-menu',
	templateUrl: './side-navigation-menu.component.html',
	styleUrls: ['./side-navigation-menu.component.scss'],
	// animations: [growAnimation, fadeInEnterOnlyAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationMenuComponent implements OnInit, OnDestroy {
	// currentUser$: Observable<IUser> = this.store.select(AppUserSelector.currentUser);
	currentUser$ = null;

	menuItems: Partial<INavBarItem>[] = [];
	navItems: Partial<INavBarItem>[] = [];

	unreadMessagesCount = 0;
	subscription: Subscription = new Subscription();

	isUseNative: boolean;
	isCollapsed: boolean;
	isDarkThemSelected: boolean = true;
	isSaveProject = false;
	isShowConversationBox = false;
	isCreateProjectPopupVisible = false;

	isOnboardingHelpShown = false;
	isOnboarding = false;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private router: Router	) {}

	ngOnInit(): void {
		// this.isDarkThemSelected =
			// 'dark' === this.userPreference?.selectedTheme?.trim().toLowerCase();
	}



	createDataTree(dataset: Partial<INavBarItem>[]): Partial<INavBarItem>[] {
		if (!dataset || dataset.length === 0) return [];

		const hashTable: { [id: number]: Partial<INavBarItem> } = {};
		dataset.forEach(aData => (hashTable[aData.id] = { ...aData, items: [] }));

		const dataTree: Partial<INavBarItem>[] = [];
		dataset.forEach(aData => {
			if (aData.parentId && !!hashTable[aData.parentId]) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
				hashTable[aData.parentId]?.items?.push(hashTable[aData.id]);
			} else {
				dataTree.push(hashTable[aData.id]);
			}
		});

		dataTree.forEach(_ => (_.hasItems = _.items.length > 0));

		return dataTree.sort((a, b) => a.orderIndex - b.orderIndex);
	}

	toggleMenu(id: number): void {
		this.navItems.forEach(menu => {
			if (menu.id === id) {
				menu.expanded = !menu.expanded;
			} else {
				menu.expanded = false;
			}
		});
	}

	collapseAllSubMenu(): void {
		this.navItems.forEach(item => (item.expanded = false));
	}

	generateMenuItem(
		id: number,
		isSelected: boolean,
		text: string,
		icon: string,
		routerLink: string,
		parentId: number
	): Partial<INavBarItem> {
		return {
			id: id,
			text: text,
			icon: icon,
			routerLink: routerLink,
			selected: isSelected,
			expanded: isSelected,
			parentId: parentId,
		};
	}

	toggle(event: MouseEvent): void {
		if (!event) {
			return;
		}
		// Close all sub menu if nav bar is expanded
		let animationTime = 0;
		if (!this.isCollapsed) {
			animationTime = 300;
			this.collapseAllSubMenu();
		}
		setTimeout(() => {
			this.isCollapsed = !this.isCollapsed;
			// this.store.dispatch(new ToggleNavbar({ isExpanded: !this.isCollapsed }));
			this.changeDetector.detectChanges();
		}, animationTime);
	}

	treeItemClick(subItem: Partial<INavBarItem>): void {
		if (this.router.url === subItem.routerLink) {
			return;
		}

		// Select parent item
		if (subItem.parentId) {
			this.navItems.forEach(_ => (_.selected = _.id === subItem.parentId));
		} else {
			this.navItems.forEach(_ => (_.selected = _.id === subItem.id));
		}

		// this.titleService.setTitle(Utility.formatTitle(subItem.text));

		if (this.isCollapsed) {
			// NOTE! set timeout to make sure router link attribute has triggered
			setTimeout(() => {
				this.navItems.forEach(nav => (nav.expanded = false));
				this.changeDetector.detectChanges();
			}, 50);
		}
	}

	showPopoverCreateProject(event: MouseEvent): void {
		event.stopPropagation();
		this.isCreateProjectPopupVisible = !this.isCreateProjectPopupVisible;
	}

	onSettingLinkClicked(): void {
		sessionStorage.setItem('backFromSettingRouter', `${this.router.url}`);
		void this.router.navigateByUrl('/setting').then();
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	goToChildrenPage():void {
		this.router.navigate(['admin/manage-children']).then();
	}

	goToEmployeePage():void {
		this.router.navigate(['admin/manage-employee']).then();
	}

	onActivityButtonClicked():void {
		this.router.navigate(['admin/activity']).then();
	}

    onChildRequestLinkClicked() {
		this.router.navigate(['admin/child-requests']).then();
    }
}
