import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { ClientComponent } from './components/client.component';
import { AvatarComponent, HeaderComponent } from './components/header';

const SVG_ICONS = [
];

export const routes: Routes = [
{
    path: '',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [

    ]
}

];

// const PROVIDERS = [SubscriptionPlanService];
const COMPONENTS = [
  ClientComponent,
  HeaderComponent,
  AvatarComponent
];

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        ThemeModule,
        RouterModule,
        RouterModule.forChild(routes),
        CommonModule,
    ],
    exports: [COMPONENTS]
    // providers: [...PROVIDERS]
})
export class ClientModule {
    constructor(private svgIconRegistry: SvgIconsRegistry) {
        svgIconRegistry.registerIcons(SVG_ICONS);
    }
}
