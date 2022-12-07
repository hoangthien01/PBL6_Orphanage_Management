import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEqual } from 'lodash';

@Component({
	selector: 'app-tab-menu',
	templateUrl: './tab-menu.component.html',
	styleUrls: ['./tab-menu.component.scss'],
})
export class AppTabComponent implements OnInit {
	@Input() tabs: any[];
	@Input() valueExpr: string | number = 'value';
	@Input() displayExpr: string = 'text';

	private _selectedTab: any;
	get selectedTab() {
		return this._selectedTab;
	}

	@Input() set selectedTab(value: any) {
		this._selectedTab = value;
		this.selectedTabChange.emit(value);
	}

	@Output() selectedTabChange = new EventEmitter<any>();
	@Output() onSelectionChanged: EventEmitter<any> = new EventEmitter<any>();

	constructor() {}

	ngOnInit() {}

	changeTab(tab) {
		if (isEqual(this.selectedTab, tab)) {
			return;
		}
		this.selectedTab = tab;
		this.onSelectionChanged.emit(tab);
	}
}
