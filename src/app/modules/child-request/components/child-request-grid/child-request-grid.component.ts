import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildrenModel } from '@app/modules/children/models';
import { LoadResultModel } from '@app/shared/models';
import { AppNotify } from '@app/utilities';
import { DxPopoverComponent } from 'devextreme-angular';
import { LoadOptions } from 'devextreme/data';
import DataSource from 'devextreme/data/data_source';
import { ChildRequestStatusEnum, RequestStatusEnum } from '../../data/enum/request-status.enum';
import { ChildRequestService } from '../../data/services/child-request.service';
import { ChildRequestModel, ChildRequestsResponseModel } from '../../models/child-request.model';

@Component({
    selector: 'app-child-request-grid',
    templateUrl: './child-request-grid.component.html',
    styleUrls: ['./child-request-grid.component.scss'],
})
export class ChildRequestGridComponent implements OnInit {
    isLoadingPage: boolean = false;
    isShowNewLocationPopup: boolean;
    searchString: string;
    //   ORGANIZATION_STATUS = ORGANIZATION_STATUS;
    dataSource: DataSource;
    @Input() status: number;
    @Input() loadData: boolean = false;
    @Output() loadChildRequestCounting = new EventEmitter();
    requestStatus = {
        Active: RequestStatusEnum.Active,
        Pending: RequestStatusEnum.Pending,
        Inactive: RequestStatusEnum.Inactive
    };

    childRequestStatusEnum = {
        Pending: ChildRequestStatusEnum.Pending,
        Approve: ChildRequestStatusEnum.Approve,
        Reject: ChildRequestStatusEnum.Reject,
        Cancel: ChildRequestStatusEnum.Cancel,
    };
    isApprovePopup: boolean = false;
    isRejectPopup: boolean = false;
    isCancelPopup: boolean = false;
    selectedRequestId: string;
    page: number = 1;
    page_size: number = 10;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private childRequestService: ChildRequestService
    ) {
    }

    ngOnInit(): void {
        this.loadChildRequests();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes['loadData']) {
            const currentValue = changes['loadData'].currentValue;
            if (currentValue === true) {
                this.loadChildRequests();
            }
        }
    }

    loadChildRequests() {
        this.dataSource = new DataSource({
            load: (loadOptions) => this.gridLoadOption(loadOptions),
        });
    }

    gridLoadOption(loadOptions: LoadOptions): Promise<LoadResultModel<ChildRequestModel[]>> {
        // if (!loadOptions.take) {
        //     return;
        //   }

        //   if (this.searchString) {
        //     Object.assign(params, { searchString: this.searchString });
        //   }
        this.loadChildRequestCounting.emit();

        const params = {
            page: this.page,
            page_size: this.page_size,
        };
        if (this.status === this.requestStatus.Pending) {
            return this.childRequestService.getPendingChildRequests(params).toPromise()
                .finally(() => {
                })
                .then((res) => {
                    return {
                        data: res.results,
                        totalCount: res.count
                    };
                });
        } else {
            return this.childRequestService.getActiveChildRequests(params).toPromise()
                .finally(() => {
                })
                .then((res) => {
                    return {
                        data: res.results,
                        totalCount: res.count
                    };
                });
        }
    }

    editAdditionalLocation(id: string, e) {
        this.router.navigate([`./${id}/edit`], { relativeTo: this.activatedRoute });
    }

    onSearchLocation(searchString) {
        this.searchString = searchString;
        this.loadChildRequests();
    }

    onApproveRequest(status) {
        this.childRequestService.approveRequest(this.selectedRequestId).subscribe(
            (result) => {
                this.selectedRequestId = '';
                this.isApprovePopup = false;
                AppNotify.success('Yêu cầu đã được chấp nhận thành công');
                this.loadChildRequests();
            },
            (error) => {
                this.selectedRequestId = '';
                this.isApprovePopup = false;
                AppNotify.error(error);
            }
        );
        this.selectedRequestId = '';
        this.isApprovePopup = false;
    }

    onRejectRequest(status) {
        this.childRequestService.rejectRequest(this.selectedRequestId).subscribe(
            (result) => {
                this.isRejectPopup = false;
                this.selectedRequestId = '';
                AppNotify.success('Từ chối yêu cầu thành công');
                this.loadChildRequests();
            },
            (error) => {
                this.selectedRequestId = '';
                this.isRejectPopup = false;
                AppNotify.error(error);
            }
        );
        this.selectedRequestId = '';
        this.isRejectPopup = false;
    }

    onCancelInvite(status) {
        this.childRequestService.cancelInvitation(this.selectedRequestId).subscribe(
            (result) => {
                this.selectedRequestId = '';
                this.isCancelPopup = false;
                AppNotify.success('Hủy yêu cầu thành công');
                this.loadChildRequests();
            },
            (error) => {
                this.selectedRequestId = '';
                this.isCancelPopup = false;
                AppNotify.error(error);
            }
        );
        this.isCancelPopup = false;
        this.selectedRequestId = '';
    }

    openApproveRequestPopup(id) {
        this.selectedRequestId = id;
        this.isApprovePopup = true;
    }

    openRejectRequestPopup(id) {
        this.selectedRequestId = id;
        this.isRejectPopup = true;
    }

    openCancelInvitePopup(id) {
        this.selectedRequestId = id;
        this.isCancelPopup = true;
    }
}
