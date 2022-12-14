import { ClientModule } from './modules/client/client.module';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
// import { QuicklinkStrategy } from 'ngx-quicklink';
import { environment } from '@environment';
import { PageNotFoundComponent } from './theme/components';

const routes: Routes = [
	{
    	path: '',
    	loadChildren: () => import('@app/modules/client/client.module').then(m => m.ClientModule),
        data: { preload: false }
  	},
  	{
    	path: 'auth',
    	loadChildren: () => import('@app/modules/auth/auth.module').then(m => m.AuthModule),
        data: { preload: false }
  	},
  	{
        path: 'admin',
        loadChildren: () => import('@app/modules/home/home.module').then(m => m.HomeModule),
        data: { preload: false }
    },
	// { path: '**', component: PageNotFoundComponent },
];

// Load develop module if not in prod environment
if(!environment.production){
	routes.unshift({
		path: 'styles',
		loadChildren: () => import('@app/modules/develop/style-system.module').then(m => m.StyleSystemModule),
	});
}

const config: ExtraOptions = {
  	useHash: false,
  	enableTracing: false,
  // preloadingStrategy: QuicklinkStrategy
};

@NgModule({
  	imports: [RouterModule.forRoot(routes, config)],
  	exports: [RouterModule]
})
export class AppRoutingModule {
}
