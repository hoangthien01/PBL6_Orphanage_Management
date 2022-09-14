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
