import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
//
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthComponent } from './auth.component';
//
import { SvgIconsRegistry } from '@app/core/services';
//
import {
  svgIconWarningCircle,
  svgIconWoosenderLogoColor
} from 'src/assets/images/svg-icons.constants';

const SVG_ICONS = [
  svgIconWoosenderLogoColor,
  svgIconWarningCircle
];

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      // CAUSING: if you change the SignUp Url, you should update ENDPOINTS.SIGN_UP as well
      // {
      //   path: 'sign-up-now',
      //   component: SignUpComponent,
      //   canDeactivate: [DeactivateGuard],
      // },
      // {
      //   path: 'login',
      //   component: LoginComponent,
      // },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      }
    ]
  }

];

// const PROVIDERS = [SubscriptionPlanService];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  // providers: [...PROVIDERS]
})
export class AuthModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
