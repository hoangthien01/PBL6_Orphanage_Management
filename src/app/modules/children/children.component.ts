import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ChildrenModel } from './models';
import { ListChildrenResponseModel } from './models/children-response.model';
import { ChildrenService } from './services/children-management.service';
import { saveAs } from 'file-saver-es';

@Component({
  selector: 'app-children-management',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenManagementComponent implements OnInit, OnDestroy {
  childrenDataSource: ChildrenModel[];
  //
  pagingSize: number = 10;
  pageIndexDefault: number = 1;
  //
  isLoading: boolean = false;
  //
  constructor(private childrenService: ChildrenService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getListChildrens();
  }

  ngOnDestroy(): void {
  }

  getListChildrens() {
    this.childrenService.getListChildrens(this.pageIndexDefault, this.pagingSize).subscribe(children => {
      this.childrenDataSource = children.results;
      this.changeDetector.detectChanges();
    });
  }

  onAddChildren() {

  }

  onPageIndexChanged(pageIndex: number) {
    this.pageIndexDefault = pageIndex;
    this.getListChildrens();
    // this._store.dispatch(new ProspectsActiveActions.SetProspectsPageIndex(pageIndex));
  }

  setPagingSize(pagingSize: number) {
    // Save paging
    if (this.pagingSize === pagingSize) {
        return;
    }
    //
    this.pagingSize = pagingSize;
    this.getListChildrens();
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
}
