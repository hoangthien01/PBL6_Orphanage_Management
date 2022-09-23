import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';

@Injectable({
    providedIn: 'root'
})
export class CanLoadAdminGuard implements CanLoad {
    constructor(private baseService: AdminBaseService) {
    }

    canLoad(): boolean {
        return this.baseService.isAdminLoggedIn;
    }
}
