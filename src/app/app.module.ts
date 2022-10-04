import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from '@environment';
import { NgxsModule } from '@ngxs/store';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
//
import { AppComponent } from './app.component';
import { AppInitService } from './core/services';
import { UserLookupState } from './core/store/user-lookup/user-lookup.state';
import { UserState } from './core/store/user/user.state';

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
    NgxsModule.forRoot([UserState, UserLookupState], {
      developmentMode: !environment.production,
      selectorOptions: {
          suppressErrors: false,
          injectContainerState: false
      }
    }),
    // ngx-permissions
		NgxPermissionsModule.forRoot(),
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
