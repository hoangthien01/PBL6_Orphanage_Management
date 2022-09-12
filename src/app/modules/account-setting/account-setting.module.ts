import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
//
import { SharedModule } from '@app/shared/shared.module';
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
//
import {
    svgIconCopy
} from 'src/assets/images/svg-icons.constants';

export const routes: Routes = []
const SVG_ICONS = [
    svgIconCopy
];


@NgModule({
    declarations: [
    ],
    imports: [
        // NgxsModule.forFeature([...STATES]),
        ThemeModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    // providers: [...SERVICES]
})
export class AccountSettingModule {
    constructor(private svgIconRegistry: SvgIconsRegistry) {
        svgIconRegistry.registerIcons(SVG_ICONS);
    }
}
