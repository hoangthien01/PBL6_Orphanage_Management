import { EmployeeManagementModule } from './../employee/employee.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { ChildrenManagementComponent } from './children.component';
import { ChildAddComponent } from './components/child-add/child-add.component';
import { ChildDetailComponent } from './components/child-detail/child-detail.component';
//
const SVG_ICONS = [
];

const COMPONENTS = [
  ChildrenManagementComponent,
  ChildAddComponent,
  ChildDetailComponent
];

export const routes: Routes = [
  {
    path: '',
    component: ChildrenManagementComponent,
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
    CommonModule,
  ],
  exports: []
  // providers: [...PROVIDERS]
})
export class ChildrenManagementModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
