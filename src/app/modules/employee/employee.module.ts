import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeManagementComponent } from './employee.component';
import { ProfileAvatarComponent } from './components/employee-detail/avatar/avatar.component';
import { ProfileGeneralInfoComponent } from './components/employee-detail/profile-general-info/profile-general-info.component';
import { ChangePasswordComponent } from './components/employee-detail/change-password/change-password.component';
//
const SVG_ICONS = [
];

const COMPONENTS = [
  EmployeeManagementComponent,
  EmployeeAddComponent,
  EmployeeDetailComponent,
  ProfileAvatarComponent,
  ProfileGeneralInfoComponent,
  ChangePasswordComponent
];

export const routes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
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
    CommonModule
  ],
  exports: [],
  providers: [...PROVIDERS]
})
export class EmployeeManagementModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
