import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AppNotify } from '@app/utilities';
import { RequestStatusEnum } from './data/enum/request-status.enum';
import { ChildRequestService } from './data/services/child-request.service';

@Component({
    selector: 'app-child-requests',
    templateUrl: './child-request.component.html',
    styleUrls: ['./child-request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildRequestsComponent implements OnInit {
    isShowNewLocationPopup: boolean = false;
    showInviteAdminInput: boolean = false;
    isLoading: boolean = false;
    reloadData: boolean = false;
    childRequestCounting: any;
    orgAdministratorRadio: object[] = [
        {
            id: 1,
            text: "No, I'll manage myself"
        }, {
            id: 2,
            text: "Yes, I would like someone to manage with me"
        }
    ];
    //
    RequestStatusEnum = RequestStatusEnum;
    selectedTab = RequestStatusEnum.Active;

    constructor(
        private childRequestService: ChildRequestService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.onLoadChildRequestCounting();
    }

    onLoadChildRequestCounting() {
        this.childRequestService.getTabsCounting().subscribe((result) => {
            this.childRequestCounting = result;
            this.cdr.detectChanges();
        });
    }

    onSelectTab(status: RequestStatusEnum) {
        this.selectedTab = status;
    }

    openAddNewLocation() {
        this.reloadData = false;
        this.isShowNewLocationPopup = true;
    }

    closeAddNewLocation() {
        this.showInviteAdminInput = false;
        this.isShowNewLocationPopup = false;
    }

    addLocation(e) {
        const res = e.validationGroup.validate();
        res.status === "pending" && res.complete.then((r) => {
            if (r.status === 'invalid') {
                AppNotify.error('Some fields are invalid');
                return false;
            } else {
                this.isLoading = true;
                // this.organization.state = 'default';
                // this.organization.isSubOrg = true;
                // this.childRequestService.addSubOrganization(this.organization).subscribe(
                //   (result) => {
                //     this.isLoading = false;
                //     AppNotify.success('Add organization successfully');
                //     // this.loadLocationCounting();
                //     this.reloadData = true;
                //     this.isShowNewLocationPopup = false;
                //     this.organization = new AdditionalLocationModel();
                //     this.showInviteAdminInput = false;
                //   },
                //   (error) => {
                //     this.isLoading = false;
                //     AppNotify.error(error);
                //   }
                // )
            }
        });
    }

    addLocationWithEmail(e) {
        const res = e.validationGroup.validate();
        res.status === "pending" && res.complete.then((r) => {
            if (r.status === 'invalid') {
                AppNotify.error('Some fields are invalid');
                return false;
            } else {
                // this.organization.state = 'default';
                // this.childRequestService.addSubOrganizationWithEmail(this.organization).subscribe(
                //   (result: any) => {
                //     this.isLoading = false;
                //     if (result.isSuccess === true) {
                //       AppNotify.success('Add organization successfully');
                //     } else {
                //       AppNotify.error(result.message);
                //     }
                //     this.showInviteAdminInput = false;
                //     // this.loadLocationCounting();
                //     this.reloadData = true;
                //     this.isLoading = true;
                //     this.isShowNewLocationPopup = false;
                //     this.organization = new AdditionalLocationModel();
                //   },
                //   (error) => {
                //     this.isLoading = false;
                //     AppNotify.error(error);
                //   }
                // )
            }
        });
    }
}
