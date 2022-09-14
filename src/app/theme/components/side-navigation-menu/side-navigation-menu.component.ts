import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
//
import { Utility } from '@apps/shared/utilities';

import { INavBarItem } from '@app/shared/models';
import { Title } from '@angular/platform-browser';
import { fadeInEnterOnlyAnimation, growAnimation } from '@cleeksy/shared/configurations/common';
// import { ToggleNavbar } from '@cleeksy/shared/data-access/app-ui-state';

@Component({
	selector: 'app-side-navigation-menu',
	templateUrl: './side-navigation-menu.component.html',
	styleUrls: ['./side-navigation-menu.component.scss'],
	animations: [growAnimation, fadeInEnterOnlyAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationMenuComponent implements OnInit, OnDestroy {
	currentUser$: Observable<IUser> = this.store.select(AppUserSelector.currentUser);

	menuItems: Partial<INavBarItem>[] = [];
	navItems: Partial<INavBarItem>[] = [];

	unreadMessagesCount = 0;
	subscription: Subscription = new Subscription();

	isUseNative: boolean;
	isCollapsed: boolean;
	isDarkThemSelected: boolean;
	isSaveProject = false;
	isShowConversationBox = false;
	isCreateProjectPopupVisible = false;

	isOnboardingHelpShown = false;
	isOnboarding = false;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private titleService: Title,
		private store: Store,
		private router: Router	) {}

	ngOnInit(): void {
		this.isDarkThemSelected =
			// 'dark' === this.userPreference?.selectedTheme?.trim().toLowerCase();
	}

	private processRecentAndFavoriteProject(
		projects: { id: number; name: string; icon: string; slug: string }[]
	): Partial<INavBarItem>[] {
		let projectId = Number.MIN_SAFE_INTEGER;
		let isInWorkModule = false;
		if (this.router.url.startsWith('/work')) {
			isInWorkModule = true;
			const urlSplit = this.router.url.split('/');
			if (urlSplit.length === 4) {
				const projectSlug = urlSplit[2];
				const project = projects.find(_ => _.slug === projectSlug);
				if (project) {
					projectId = project.id;
				}
			}
		}
		const projectsMenuItems: Partial<INavBarItem>[] = [];
		const workItem = this.menuItems.find(_ => _.routerLink === 'work');
		projects.forEach(_ => {
			projectsMenuItems.push(
				this.generateMenuItem(
					_.id,
					isInWorkModule && projectId === _.id,
					_.name,
					_.icon,
					`/work/${_.id}-${_.slug}`,
					workItem?.id
				)
			);
		});

		return projectsMenuItems;
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

		this.titleService.setTitle(Utility.formatTitle(subItem.text));

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


	filterWorkItem = (items: Partial<INavBarItem>[]): Partial<INavBarItem> =>
		items.find(_ => _.routerLink === 'work');

	filterOrkItem = (items: Partial<INavBarItem>[]): Partial<INavBarItem> =>
		items.find(_ => _.routerLink === 'okr');

	filterBusinessProcessItem = (items: Partial<INavBarItem>[]): Partial<INavBarItem> =>
		items.find(_ => _.routerLink === 'business-process');

	filterOtherItems = (items: Partial<INavBarItem>[]): Partial<INavBarItem>[] =>
		items.filter(
			_ =>
				_.routerLink !== 'okr' &&
				_.routerLink !== 'business-process' &&
				_.routerLink !== 'work'
		);

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
