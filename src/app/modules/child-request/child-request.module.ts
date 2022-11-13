import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { ChildRequestGridComponent } from './components/child-request-grid/child-request-grid.component';
import { ChildRequestsComponent } from './child-request.component';
import { ChildReuqestEditFormComponent } from './components/edit-form/edit-form.component';
//
const SVG_ICONS = [
];

const COMPONENTS = [
    ChildRequestsComponent,
    ChildRequestGridComponent,
    ChildReuqestEditFormComponent
];

export const routes: Routes = [
  {
    path: '',
    component: ChildRequestsComponent,
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
  exports: [  ...COMPONENTS],
  providers: [...PROVIDERS]
})
export class ChildRequestModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
