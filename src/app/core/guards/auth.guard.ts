import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
//
import { UserStorage } from '@app/core/store/user/user.storage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (UserStorage.isLoggedIn()) {
            return true;
        }
        //
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } }).then();
        return false;
    }
}
