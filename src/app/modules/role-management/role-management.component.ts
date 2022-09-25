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

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getRolesDatasource();
  }

  ngOnDestroy(): void {
  }

  getRolesDatasource(){
    return this.roleService.getRoles().subscribe(
      (res) => {
        this.roleDataSource = res.results;
      }
    )
  }
}
