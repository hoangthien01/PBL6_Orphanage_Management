import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { EmployeeModel } from './models';
import { EmployeeService } from './services/employee-management.service';
import { saveAs } from 'file-saver-es';
import { LoadOptions } from 'devextreme/data';
import { LoadResultModel } from '@app/shared/models';
import DataSource from 'devextreme/data/data_source';
import { GENDER_TYPES } from '@app/shared/app.constants';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {
  employeeSource: DataSource;
  employeeDetail: EmployeeModel;
  //
  pagingSize: number = 10;
  pageIndexDefault: number = 0;
  //
  isLoading: boolean = false;
  isShowAddChildPopup: boolean = false;
  isShowChildDetailPopup: boolean = false;
  totalCount: any;
  genderLookup = GENDER_TYPES;
  //
  constructor(private employeeService: EmployeeService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadGridData();
  }

  ngOnDestroy(): void {
  }

  loadGridData() {
    this.employeeSource = new DataSource({
        key: 'id',
        load: (option) => this.gridLoadOption(option),
        // sort: [{
        //     selector: this.sortColumnDefault,
        //     desc: this.sortOrderDefault === FilterParamsSortingTypes.Descending
        // }]
    });
    this.isLoading = true;
}

  gridLoadOption(loadOptions: LoadOptions): Promise<LoadResultModel<EmployeeModel[]>> {
    // if (!loadOptions || !loadOptions.take) {
    //     return;
    // }

    //
    const data = {
      page: this.pageIndexDefault + 1,
      pageSize: this.pagingSize,
      name: '',
    }
    // this.getSearchParamsBeforeSending(loadOptions);
    return this.employeeService.getListEmployees(data).toPromise()
        .finally(() => {
            this.isLoading = false;
            this.changeDetector.detectChanges();
        })
        .then((res) => {
            this.totalCount = res.count;
            //
            return {
                data: res.results,
                totalCount: res.count
            };
        });
  }

  onAddChildClick() {
    this.isShowAddChildPopup = true;
  }

  onPageIndexChanged(pageIndex: number) {
    this.pageIndexDefault = pageIndex;
    this.loadGridData();
    // this._store.dispatch(new ProspectsActiveActions.SetProspectsPageIndex(pageIndex));
  }

  setPagingSize(pagingSize: number) {
    // Save paging
    if (this.pagingSize === pagingSize) {
        return;
    }
    //
    this.pagingSize = pagingSize;
    this.loadGridData();
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employee.xlsx');
      });
    });
    e.cancel = true;
  }

  onViewChildInfo(e: any) {
    console.log(e);
    this.employeeDetail = e.data;
    this.isShowChildDetailPopup = true;
  }
}
