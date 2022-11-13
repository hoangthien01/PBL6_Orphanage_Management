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
import { ChildRequestsResponseModel } from '../../models/child-request.model';

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
  @Output() loadLocationCounting = new EventEmitter();
  requestStatus = {
    Active: RequestStatusEnum.Active,
    Pending: RequestStatusEnum.Pending,
  };

  userStatusEnum = {
    PendingApprove: ChildRequestStatusEnum.PendingApproval,
    PendingInvitationAcceptance: ChildRequestStatusEnum.PendingInvitationAcceptance,
  };
  isApprovePopup: boolean = false;
  isRejectPopup: boolean = false;
  isCancelPopup: boolean = false;
  selectedOrganizationId: string;
  page: number = 1;
  page_size: number = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private childRequestService: ChildRequestService
  ) {
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['loadData']) {
      const currentValue = changes['loadData'].currentValue;
      if (currentValue === true) {
        this.loadLocations();
      }
    }
  }

  loadLocations() {
    this.dataSource = new DataSource({
      load: (loadOptions) => this.gridLoadOption(loadOptions),
    });
  }

  gridLoadOption(loadOptions: LoadOptions): Promise<ChildRequestsResponseModel[]> {
    // if (!loadOptions.take) {
    //     return;
    //   }

    //   if (this.searchString) {
    //     Object.assign(params, { searchString: this.searchString });
    //   }
    //   this.loadLocationCounting.emit();

    const params = {
        page: this.page,
        page_size: this.page_size,
    };
      console.log('params', params);
    if (this.status === this.requestStatus.Pending) {
        return this.childRequestService.getPendingChildRequests(params).toPromise();
    }
    if (this.status === this.requestStatus.Active) {
        return this.childRequestService.getActiveChildRequests(params).toPromise();
    }
  }

  editAdditionalLocation(id: string, e) {
    this.router.navigate([`./${id}/edit`], { relativeTo: this.activatedRoute });
  }

  onSearchLocation(searchString) {
    this.searchString = searchString;
    this.loadLocations();
  }

  onApproveRequest(status) {
    if (status) {
      this.childRequestService.approveRequest(this.selectedOrganizationId).subscribe(
        (result) => {
          this.selectedOrganizationId = '';
          this.isApprovePopup = false;
          AppNotify.success('Approve organization access request successfully');
          this.loadLocations();
        },
        (error) => {
          this.selectedOrganizationId = '';
          this.isApprovePopup = false;
          AppNotify.error(error);
        }
      );
    } else {
      this.selectedOrganizationId = '';
      this.isApprovePopup = false;
    }
  }

  onRejectRequest(status) {
    if (status) {
      this.childRequestService.rejectRequest(this.selectedOrganizationId).subscribe(
        (result) => {
          this.isRejectPopup = false;
          this.selectedOrganizationId = '';
          AppNotify.success('Reject  organization access request successfully');
          this.loadLocations();
        },
        (error) => {
          this.selectedOrganizationId = '';
          this.isRejectPopup = false;
          AppNotify.error(error);
        }
      );
    } else {
      this.selectedOrganizationId = '';
      this.isRejectPopup = false;
    }
  }

  onCancelInvite(status) {
    if (status) {
      this.childRequestService.cancelInvitation(this.selectedOrganizationId).subscribe(
        (result) => {
          this.selectedOrganizationId = '';
          this.isCancelPopup = false;
          AppNotify.success('Cancel invitation successfully');
          this.loadLocations();
        },
        (error) => {
          this.selectedOrganizationId = '';
          this.isCancelPopup = false;
          AppNotify.error(error);
        }
      );
    } else {
      this.isCancelPopup = false;
      this.selectedOrganizationId = '';
    }
  }

  openApproveRequestPopup(id) {
    this.selectedOrganizationId = id;
    this.isApprovePopup = true;
  }

  openRejectRequestPopup(id) {
    this.selectedOrganizationId = id;
    this.isRejectPopup = true;
  }

  openCancelInvitePopup(id) {
    this.selectedOrganizationId = id;
    this.isCancelPopup = true;
  }
}
