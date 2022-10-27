import { CommonModule } from '@angular/common';
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
  svgIconGoogleLogo,
  svgIconWarningCircle,
} from 'src/assets/images/svg-icons.constants';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const SVG_ICONS = [
  svgIconWarningCircle,
  svgIconGoogleLogo
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
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      }
    ]
  }

];

const PROVIDERS = [];

const COMPONENTS = [
  AuthComponent,
  LoginComponent,
  SignUpComponent,
  ForbiddenComponent,
  ForgotPasswordComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [...PROVIDERS]
})
export class AuthModule {
  constructor(private svgIconRegistry: SvgIconsRegistry) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
