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
import { Feature } from '@app/shared/app.enum';
import { ENDPOINTS } from '@app/utilities/endpoints';
import { PermissionModel } from '@app/shared/models/permission.model';

@Injectable()
export class BusinessProfileGuard implements CanActivate {

    constructor(private _router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const permission: PermissionModel = PermissionModel.getPermissionByFeature({
            featureName: Feature.AccountInfo
        });
        if (permission.modified) {
            return true;
        }
        this._router.navigateByUrl(ENDPOINTS.SETTING_ACCOUNT_INFO).then();
        return false;
    }

}
