import { ActivitiesState } from './core/store/activities/activities.state';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from '@environment';
import { NgxsModule } from '@ngxs/store';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
//
import { AppComponent } from './app.component';
import { AppInitService } from './core/services';
import { UserLookupState } from './core/store/user-lookup/user-lookup.state';
import { UserState } from './core/store/user/user.state';
import { StripeModule } from 'stripe-angular';
import {NgxsResetPluginModule} from "ngxs-reset-plugin";

function initializeApp(injector: Injector) {
  console.log('Initializing App Component');

  return (): Promise<boolean> => {
      const appInitService = injector.get(AppInitService);
      return appInitService.initApp();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    //
    AppRoutingModule,
    //
    NgxsModule.forRoot([UserState, UserLookupState, ActivitiesState], {
      developmentMode: !environment.production,
      selectorOptions: {
          suppressErrors: false,
          injectContainerState: false
      }
    }),
    NgxsResetPluginModule.forRoot(),
    // ngx-permissions
    NgxPermissionsModule.forRoot(),
    QuillModule.forRoot(),
    StripeModule.forRoot("pk_test_51M066MIV4V5C5hgG2RRmkFGiwNiCTyvf1OV9zVDYvhbPxlAuAKs7K8QCtK6qbGN4HYuJsxopcCGwmCUrJ848pvNy00Bco1q7uF")
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
