import { ScopeItemModel, ScopeModel } from './models/scope.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ListRolesModel, RoleModel } from './models/role.model';
import { RoleService } from './services/role-management.service';
import { StringHelper } from '@app/utilities';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit, OnDestroy {
  roleDataSource: RoleModel[];
  scopeDataSource: ScopeItemModel[];
  scopeText: Map<string, boolean>;
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
        if (!this.roleSelected) {
          this.roleSelected = res.results[0].id;
        }
        this.scopeText = StringHelper.split_scope_text(res.results[0].scope_text);
      }
    )
  }

  getScopeDatasource() {
    this.roleService.getScopesOfRole().subscribe(res => {
      this.scopeDataSource = res.scope;

    });
  }

  roleItemChanged(e){
    this.getRolesDatasource();
  }

  async onScopeChanged(data) {
    let form = {
      'scope_text': data.scope
    }
    //
    this.roleService.updateScopeOfRole(this.roleSelected, form).subscribe(res => {
    });
  }
}
