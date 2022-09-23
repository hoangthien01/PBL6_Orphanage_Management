import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//
import {ThemeModule} from '@app/theme/theme.module';
import {SharedModule} from '@app/shared/shared.module';
//
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';
import {AdminService} from '@app/modules/admin/services/admin.service';
import {SubscriptionPlanService} from '@app/modules/admin/services/subscription-plan.service';
//
import {AdminAuthGuard, DeactivateGuard} from '@app/core/guards';
//
import {AdminComponent} from './admin.component';
import {SubscriptionPlanComponent} from './components/subscription-plan/subscription-plan.component';
import {UserHeaderComponent} from './components/user-header/user-header.component';
import {SubscriptionListComponent} from './components/subscription-plan/subscription-list/subscription-list.component';
import {SubscriptionPlanDetailsComponent} from './components/subscription-plan/subscription-plan-details/subscription-plan-details.component';
import {SubscriptionAssignmentComponent} from '@app/modules/admin/components/subscription-assignment/subscription-assignment.component';
import {
    LoginComponent,
    SubscriptionManagementActionButtonsComponent
} from '@app/modules/admin/components';
//
//
import {ADMIN_SUBSCRIPTION_PAGES} from '@app/shared/app.constants';
import {SvgIconsRegistry} from '@app/core/services';
//
import {
    svgIconCheckCircleSmall,
    svgIconDelete,
    svgIconThreeDotsHorizontal,
} from 'src/assets/images/svg-icons.constants';

const PIPES = [];

const COMPONENTS = [
    AdminComponent,
    LoginComponent,
    SubscriptionPlanComponent,
    SubscriptionPlanDetailsComponent,
    UserHeaderComponent,
    SubscriptionManagementActionButtonsComponent
];

const PROVIDERS = [AdminBaseService, AdminService, SubscriptionPlanService];

const SVG_ICONS = [
    svgIconCheckCircleSmall,
    svgIconDelete,
    svgIconThreeDotsHorizontal,
];

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        canActivate: [AdminAuthGuard],
        children: [
            {
                path: '', redirectTo: 'subscription-plan', pathMatch: 'full'
            },
            {
                path: 'subscription-plan',
                component: SubscriptionPlanComponent,
                children: [
                    {
                        path: ':id',
                        component: SubscriptionPlanDetailsComponent,
                        canDeactivate: [DeactivateGuard]
                    },
                    {
                        path: ADMIN_SUBSCRIPTION_PAGES.New,
                        component: SubscriptionPlanDetailsComponent,
                        canDeactivate: [DeactivateGuard]
                    },
                ]
            },
            {
                path: 'subscription-assignment',
                component: SubscriptionAssignmentComponent,
            }
        ]
    },
    {
        path: 'login', component: LoginComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        ThemeModule,
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        UserHeaderComponent,
        SubscriptionListComponent,
        SubscriptionAssignmentComponent,
    ],
    exports: [
        ...PIPES,
        ...COMPONENTS
    ],
    providers: [
        ...PROVIDERS
    ]
})
export class AdminModule {
    constructor(private svgIconRegistry: SvgIconsRegistry) {
        svgIconRegistry.registerIcons(SVG_ICONS);
    }
}
