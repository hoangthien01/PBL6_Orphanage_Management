import { ScopeModel } from './models/scope.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ListRolesModel, RoleModel } from './models/role.model';
import { RoleService } from './services/role-management.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit, OnDestroy {
  roleDataSource: RoleModel[];
  scopeDataSource: ScopeModel[];
  //
  roleSelected: string;

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getRolesDatasource();
    this.getScopeDatasource();
  }

  ngOnDestroy(): void {
  }

  getRolesDatasource(){
    return this.roleService.getRoles().subscribe(
      (res) => {
        this.roleDataSource = res.results;
        this.roleSelected = res.results[0].id;
      }
    )
  }

  getScopeDatasource() {
    this.roleService.getScopesOfRole().subscribe(res => {
      this.scopeDataSource = res.scope;
      console.log(this.scopeDataSource);

    });
  }

  roleItemChanged(e){
    console.log(e);

    this.roleService.getScopesOfRole().subscribe(res => {
      console.log(res);

    });
  }
}
