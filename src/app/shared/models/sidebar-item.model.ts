export class INavBarItem {
	id: number;
	parentId: number;
	orderIndex: number;
	icon: string;
	text: string;
	routerLink: string;
	searchTerms: string;
	color: string;

	items?: Array<Partial<INavBarItem>>;
	selected?: boolean;
	expanded?: boolean;
	hasItems?: boolean;
}

import {CompareTypes} from '@app/shared/app.enum';

export class TreeViewSidebarItemModel {
    id: string;
    parentId?: string;
    text: string;
    routerLink?: string;
    icon?: string;
    isExpanded?: boolean;
    isSelected: boolean;
    items?: TreeViewSidebarItemModel[];
    hasError?: boolean = false;
    //
    visible: boolean = true;

    constructor(init?: Partial<TreeViewSidebarItemModel>) {
        Object.assign(this, init);
    }
}

export class SideBarItemModel {
    // For AccountSetting - FeatureId
    featureId: string;
    value: string;
    key: string;

    description?: string;
    icon?: string;

    iconWidth?: number;
    routerLink?: string;

    // Parent
    items?: SideBarItemModel[];
    isExpanded?: boolean;
    parentRouterLink: string;
    //
    disabled: boolean = false;
    visible: boolean = true;
    //
    errorInfo?: SideBarItemErrorInfoModel;
    //
    // StartWith: with sub-route : billing - billing/info - in the same tab
    // Equals: with route: subscription-plan , subscription-assigment - 2 different tabs
    compareMode: CompareTypes = CompareTypes.StartWith;

    constructor(init?: Partial<SideBarItemModel>) {
        Object.assign(this, init);
    }
}

export class SideBarItemErrorInfoModel {
    hasError?: boolean = false;
    hasTooltip?: boolean = true;
    tooltipMessage?: string;
    tooltipWidth?: number = 200;

    constructor(init?: Partial<SideBarItemErrorInfoModel>) {
        Object.assign(this, init);
    }
}
