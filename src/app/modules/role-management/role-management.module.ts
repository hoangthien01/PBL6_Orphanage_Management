import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
//
import { RoleManagementComponent } from './role-management.component';

const SVG_ICONS = [
];

const COMPONENTS = [
];

export const routes: Routes = [
  {
    path: '',
    component: RoleManagementComponent,
  }

];

// const PROVIDERS = [SubscriptionPlanService];

@NgModule({
  declarations: [
    RoleManagementComponent
  ],
  imports: [
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: []
  // providers: [...PROVIDERS]
})
export class RoleManagementModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
