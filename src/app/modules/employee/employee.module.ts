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
//
const SVG_ICONS = [
];

const COMPONENTS = [
  EmployeeManagementComponent,
  EmployeeAddComponent,
  EmployeeDetailComponent
];

export const routes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
  }

];

// const PROVIDERS = [SubscriptionPlanService];

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
  exports: []
  // providers: [...PROVIDERS]
})
export class EmployeeManagementModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
