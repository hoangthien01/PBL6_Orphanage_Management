import { finalize } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POPUP_ANIMATION } from '@app/shared/app.constants';
import { LoadResultModel } from '@app/shared/models';
import { AppNotify } from '@app/utilities';
import { LoadOptions } from 'devextreme/data';
import DataSource from 'devextreme/data/data_source';
import { CHILD_REQUEST_STATUS } from '../../data/const/request-status.const';
import { ChildRequestStatusEnum, RequestStatusEnum } from '../../data/enum/request-status.enum';
import { ChildRequestService } from '../../data/services/child-request.service';
import { ChildRequestModel } from '../../models/child-request.model';

@Component({
    selector: 'app-child-request-grid',
    templateUrl: './child-request-grid.component.html',
    styleUrls: ['./child-request-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildRequestGridComponent implements OnInit {
    isLoadingPage: boolean = false;
    isShowRequestDetailPopup: boolean = false;
    isShowNewLocationPopup: boolean;
    searchString: string;
    dataSource: DataSource;
    requestDetail: ChildRequestModel = new ChildRequestModel();
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
    CHILD_REQUEST_STATUS = CHILD_REQUEST_STATUS;
    POPUP_ANIMATION = POPUP_ANIMATION;
    isApprovePopup: boolean = false;
    isRejectPopup: boolean = false;
    isCancelPopup: boolean = false;
    selectedRequestId: string;
    page: number = 1;
    page_size: number = 10;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private childRequestService: ChildRequestService,
        private cdr: ChangeDetectorRef,
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

    onOpenRequestDetail(e: any) {
        this.requestDetail = e;
        this.isShowRequestDetailPopup = true;
    }

    loadChildRequests() {
        this.dataSource = new DataSource({
            load: (loadOptions) => this.gridLoadOption(loadOptions),
        });
    }

    gridLoadOption(loadOptions: LoadOptions): Promise<LoadResultModel<ChildRequestModel[]>> {
        this.loadChildRequestCounting.emit();

        const params = {
            page: this.page,
            page_size: this.page_size,
        };
        switch (this.status) {
            case this.requestStatus.Pending:
                return this.childRequestService.getPendingChildRequests(params).toPromise()
                    .finally(() => {
                    })
                    .then((res) => {
                        return {
                            data: res.results,
                            totalCount: res.count
                        };
                    });
            case this.requestStatus.Active:
                return this.childRequestService.getActiveChildRequests(params).toPromise()
                    .finally(() => {
                    })
                    .then((res) => {
                        return {
                            data: res.results,
                            totalCount: res.count
                        };
                    });
            case this.requestStatus.Inactive:
                return this.childRequestService.getInactiveChildRequests(params).toPromise()
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
        this.childRequestService.approveRequest(this.selectedRequestId)
        .pipe(
            finalize(() => {
                this.cdr.detectChanges();
            })
        )
        .subscribe(
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
        this.childRequestService.rejectRequest(this.selectedRequestId)
        .pipe(
            finalize(() => {
                this.cdr.detectChanges();
            })
        )
        .subscribe(
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
        this.childRequestService.cancelInvitation(this.selectedRequestId)
        .pipe(
            finalize(() => {
                this.cdr.detectChanges();
            })
        )
        .subscribe(
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

    hidePopup() {
        this.isShowRequestDetailPopup = false;
    }
}
