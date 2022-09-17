import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@app/shared/shared.module';
import {ThemeModule} from '@app/theme/theme.module';

import { IconsComponent } from './components/icons/icons.component';

const COMPONENTS = [
	IconsComponent,
];

const PROVIDERS = [];

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: IconsComponent,
			},
			{
				path: 'icons',
				component: IconsComponent,
			},

		]),
		ThemeModule,
		SharedModule,
    CommonModule,
	],
	declarations: [
		...COMPONENTS
	],
	providers: [
		...PROVIDERS
	]
})
export class StyleSystemModule {
	constructor() {}
}
