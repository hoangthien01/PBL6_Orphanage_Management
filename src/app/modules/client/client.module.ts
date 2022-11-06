import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ThemeModule } from '@app/theme/theme.module';
//
import { SvgIconsRegistry } from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { ClientComponent } from './components/client.component';
import { AvatarComponent, HeaderComponent } from './components/header';
import { BannerComponent } from './components/home/banner/banner.component';
import { NewsComponent } from './components/home/news/news.component';
import { HomeClientComponent } from './components/home/home.component';
import { NewsDetailComponent } from './components/home/news-detail/news-detail.component';
import { svgIconCalendar, svgIconUserLight } from 'src/assets/images/svg-icons.constants';
import { DonateComponent } from './components/donate/donate.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { ProfileGeneralInfoComponent } from '../../theme/components/profile-general-info/profile-general-info.component';
import { CommentsComponent } from './components/home/news-detail/comments/comments.component';
import { ChildrensComponent } from './components/childrens/childrens.component';
import { homedir } from 'os';
import {
    RegisterChildrenComponent
} from "@app/modules/client/components/childrens/register-form/register-form.component";

const SVG_ICONS = [
  svgIconUserLight,
  svgIconCalendar
];

export const routes: Routes = [
{
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: HomeClientComponent,
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeClientComponent,
        pathMatch: 'full'
      },
      {
        path: 'childrens',
        component: ChildrensComponent,
        pathMatch: 'full',
      },
      {
        path: 'children/:id/register',
        component: RegisterChildrenComponent,
        pathMatch: 'full'
      },
      {
        path: 'donate',
        component: DonateComponent,
        pathMatch: 'full'
      },
      {
        path: 'activities/:id',
        component: NewsDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'activities/:id/donate',
        component: DonateComponent,
        pathMatch: 'full'
      },
    ]
}

];

// const PROVIDERS = [SubscriptionPlanService];
const COMPONENTS = [
  ClientComponent,
  HeaderComponent,
  AvatarComponent,
  BannerComponent,
  NewsComponent,
  HomeClientComponent,
  NewsDetailComponent,
  DonateComponent,
  FooterComponent,
  CommentsComponent,
  ChildrensComponent,
  RegisterChildrenComponent
];
const PROVIDERS = [
]

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
    exports: [...COMPONENTS],
    providers: [...PROVIDERS]
})
export class ClientModule {
    constructor(private svgIconRegistry: SvgIconsRegistry) {
        svgIconRegistry.registerIcons(SVG_ICONS);
    }
}
