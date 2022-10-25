import { ChildrenManagementModule } from './../children/children.module';
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
import { HomeContentComponent } from './components/home-content/home-content.component';
import { NgxPermissionsGuard, NgxPermissionsModule } from 'ngx-permissions';
import { ProfileGeneralInfoComponent } from '../employee/components/employee-detail/profile-general-info/profile-general-info.component';

const SVG_ICONS = [
];

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeContentComponent,
        // redirectTo: 'manage-children',
        pathMatch: 'full'
      },
      {
        path: 'manage-role',
        loadChildren: () => import('@app/modules/role-management/role-management.module').then(m => m.RoleManagementModule),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'view_children_info'
          },
          preload: false
        }
      },
      {
        path: 'manage-children',
        loadChildren: () => import('@app/modules/children/children.module').then(m => m.ChildrenManagementModule),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'view_children_info'
          },
          preload: false
        }
      },
      {
        path: 'manage-employee',
        loadChildren: () => import('@app/modules/employee/employee.module').then(m => m.EmployeeManagementModule),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'view_employee_info'
          },
          preload: false
        }
      },
      {
        path: 'activity',
        loadChildren: () => import('@app/modules/activity/activity.module').then(m => m.ActivityModule),
        canActivate: [AuthGuard],
        data: {
          preload: false
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('@app/modules/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard],
        data: {
          preload: false
        }
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
    CommonModule,
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
