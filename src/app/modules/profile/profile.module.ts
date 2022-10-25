import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { ProfileGeneralInfoComponent } from '../employee/components/employee-detail/profile-general-info/profile-general-info.component';
//
const SVG_ICONS = [
];

const COMPONENTS = [
];

export const routes: Routes = [
  {
    path: '',
    component: ProfileGeneralInfoComponent,
  }

];

const PROVIDERS = [];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [],
  providers: [...PROVIDERS]
})
export class ProfileModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
