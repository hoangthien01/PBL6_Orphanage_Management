import { AppNotify } from '@app/utilities';
import { finalize, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ChildrenModel } from './models';
import { ListChildrenResponseModel } from './models/children-response.model';
import { ChildrenService } from './services/children-management.service';
import { saveAs } from 'file-saver-es';
import { LoadOptions } from 'devextreme/data';
import { LoadResultModel } from '@app/shared/models';
import DataSource from 'devextreme/data/data_source';
import { GENDER_TYPES } from '@app/shared/app.constants';

@Component({
  selector: 'app-children-management',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenManagementComponent implements OnInit, OnDestroy {
  childrenDataSource: DataSource;
  chidlDetail: ChildrenModel;
  selectedChildIds: string[];
  //
  pagingSize: number = 10;
  pageIndexDefault: number = 0;
  //
  isLoading: boolean = false;
  isShowAddChildPopup: boolean = false;
  isShowChildDetailPopup: boolean = false;
  isVisibleDeleteBtn: boolean = false;
  isProcessing: boolean = false;
  totalCount: any;
  genderLookup = GENDER_TYPES;
  //
  constructor(private childrenService: ChildrenService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadGridData();
  }

  ngOnDestroy(): void {
  }

  loadGridData() {
    this.childrenDataSource = new DataSource({
        key: 'id',
        load: (option) => this.gridLoadOption(option),
        // sort: [{
        //     selector: this.sortColumnDefault,
        //     desc: this.sortOrderDefault === FilterParamsSortingTypes.Descending
        // }]
    });
    this.isLoading = true;
}

  gridLoadOption(loadOptions: LoadOptions): Promise<LoadResultModel<ChildrenModel[]>> {
    // if (!loadOptions || !loadOptions.take) {
    //     return;
    // }
    //
    const data = {
      page: this.pageIndexDefault + 1,
      pageSize: this.pagingSize,
      name: '',
      status: 'all',
    }
    // this.getSearchParamsBeforeSending(loadOptions);
    return this.childrenService.getListChildrens(data).toPromise()
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

  onDeleteChild() {
    this.isProcessing = true;
    this.childrenService.deleteChild(this.selectedChildIds).subscribe(
        res => {
            AppNotify.success("Xóa thông tin trẻ thành công.");
            this.childrenDataSource.reload();
            this.isProcessing = false;
        }
    );
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
    const worksheet = workbook.addWorksheet('Childrens');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Childrens.xlsx');
      });
    });
    e.cancel = true;
  }

  onViewChildInfo(e: any) {
    console.log(e);
    this.chidlDetail = e.data;
    this.isShowChildDetailPopup = true;
  }

  onChildrenAdded(event: boolean) {
    this.loadGridData();
  }

  selectedRow(e: any) {
    console.log(e);
    if (e.selectedRowKeys.length > 0) {
        this.selectedChildIds = e.selectedRowKeys;
        this.isVisibleDeleteBtn = true;
    } else {
        this.isVisibleDeleteBtn = false;
    }

  }
}
