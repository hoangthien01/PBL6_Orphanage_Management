import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { ActivityComponent } from './activity.component';
//
import { FormsModule } from '@angular/forms';
//
import { QuillModule } from 'ngx-quill'
//
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import "quill-emoji/dist/quill-emoji.css";
//
const SVG_ICONS = [
];

const COMPONENTS = [
  ActivityComponent
];

export const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
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
    FormsModule,
    // for text editor
    QuillModule
  ],
  exports: [],
  providers: [...PROVIDERS]
})
export class ActivityModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
