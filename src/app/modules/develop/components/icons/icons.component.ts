import { Component, OnInit } from '@angular/core';
import * as constants from 'src/assets/images/svg-icons.constants';

@Component({
	selector: 'app-icons',
	templateUrl: './icons.component.html',
	styleUrls: ['./icons.component.scss'],
})

export class IconsComponent implements OnInit {
	listIcons: any[] = [];

	constructor() {
	}

	ngOnInit() {
		var keys = Object.keys(constants);
		for (var i = 0; i < keys.length; i++) {
			var val = constants[keys[i]];
			this.listIcons.push(val);
		}
	 }
}