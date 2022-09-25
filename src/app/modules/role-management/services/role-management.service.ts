import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ScopeModel } from '../models/scope.model';
//
import { ListRolesModel } from './../models/role.model';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private userURL = 'api/v1/user';

  constructor(private baseService: BaseService) {
  }

  getRoles(): Observable<ListRolesModel> {
    return this.baseService.get(`${this.userURL}/role`);
  }

  getScopesOfRole(): Observable<any> {
    return this.baseService.get(`${this.userURL}/auth/retrieve_all_scopes`);
  }
}
