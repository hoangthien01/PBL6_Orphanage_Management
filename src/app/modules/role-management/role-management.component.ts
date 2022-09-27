import { cloneDeep, isEqual } from 'lodash-es';
import { ScopeItemModel, ScopeModel } from './models/scope.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ListRolesModel, RoleModel } from './models/role.model';
import { RoleService } from './services/role-management.service';
import { ArrayHelper, StringHelper } from '@app/utilities';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleManagementComponent implements OnInit, OnDestroy {
  @ViewChild('roleDataGrid') roleDataGrid: DxDataGridComponent;
  //
  private _valueChangedSubject$: Subject<string> = new Subject<string>();
  //
  roleDataSource: RoleModel[];
  scopeDataSource: ScopeItemModel[];
  scopeText: Map<string, boolean>;
  //
  roleSelected: string;
  scopeActive = [];
  scopeActiveEditting = [];
  //
  isDataChanged: boolean = false;
  isLoading: boolean = false;
  //
  constructor(private roleService: RoleService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getRolesDatasource();
    this.getScopeDatasource();
    this._valueChangedSubject$.pipe(
      debounceTime(200),
    ).subscribe(() => {
        this.isDataChanged = this.checkIsDataChanged();
        this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
  }

  checkIsDataChanged(): boolean {
    return !isEqual(this.scopeActive, this.scopeActiveEditting);
  }

  getRolesDatasource(){
    this.isLoading = true;
    this.scopeText = new Map<string, boolean>();
    return this.roleService.getRoles().pipe(
      finalize(() => {
        this.isLoading = false;
        this.roleDataGrid.instance.repaint();
        this.cdr.markForCheck();
      })
    ).subscribe(
      (res) => {
        this.roleDataSource = res.results;
        let index = res.results.findIndex(r => r.id === this.roleSelected);
        if (index === -1) {
          index = 0;
        }
        this.roleSelected = res.results[index].id;
        this.scopeText = StringHelper.split_scope_text(res.results[index].scope_text);
        this.scopeActive = res.results[index].scope_text.split(' ');
        this.scopeActiveEditting = cloneDeep(this.scopeActive);
      }
    )
  }

  getScopeDatasource() {
    this.roleService.getScopesOfRole().subscribe(res => {
      this.scopeDataSource = res.scope;
    });
  }

  roleItemChanged(e){
    // this.getScopeDatasource();
    this.getRolesDatasource();
  }

  dataChanged() {
    this._valueChangedSubject$.next();
  }

  onUpdateScopeSetting() {
    this.isLoading = true;
    let form = {
      'scope_text': ArrayHelper.convertToString(this.scopeActiveEditting)
    }
    this.scopeActive = cloneDeep(this.scopeActiveEditting);
    this.roleService.updateScopeOfRole(this.roleSelected, form).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {
    });
  }

  async onScopeChanged(data) {
    const index = this.scopeActiveEditting.findIndex(x => x === data.scope);
    if ( index !== -1) {
      this.scopeActiveEditting.splice(index, 1);
    } else {
      this.scopeActiveEditting.push(data.scope);
    }
    this.dataChanged();
  }
}
