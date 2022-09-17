import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components';
import { AvatarComponent } from './components/header/avatar/avatar.component';
import { AuthGuard } from '@app/core/guards';
//

const SVG_ICONS = [
];

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ]
  }

];

// const PROVIDERS = [SubscriptionPlanService];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AvatarComponent
  ],
  imports: [
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    AvatarComponent
]
  // providers: [...PROVIDERS]
})
export class HomeModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
