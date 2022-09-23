import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router,
                private adminBaseService: AdminBaseService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.isLoggedIn()) {

            return false;
        }

        //
        // Access Control is not required
        if (!route.data || !route.data['featureName']) {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLoggedIn();
    }

    canLoad(route: Route): boolean {
        return this.isLoggedIn();
    }

    private isLoggedIn(): boolean {
        if (this.adminBaseService.isAdminLoggedIn) {
            return true;
        }
        //
        // Not logged in so redirect to login page with the return url
        this.router.navigate(['admin/login']).then();

        return false;
    }
}
