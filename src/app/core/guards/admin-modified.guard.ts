import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { PermissionModel } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class AdminModifiedGuard implements CanActivate {
    constructor(private _router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const permission: PermissionModel = PermissionModel.getPermissionByFeature({
            featureName: route.data['featureName']
        });

        if (permission.modified) {
            return true;
        }
        this._router.navigate(['/']).then();
        return false;
    }

}
