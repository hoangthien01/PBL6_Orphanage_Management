import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppNotify } from '@app/utilities';
import { RequestStatusEnum } from './data/enum/request-status.enum';
import { ChildRequestService } from './data/services/child-request.service';

@Component({
  selector: 'app-child-requests',
  templateUrl: './child-request.component.html',
  styleUrls: ['./child-request.component.scss']
})
export class ChildRequestsComponent implements OnInit {
//   organization = new AdditionalLocationModel();
  organization : any;
  isShowNewLocationPopup: boolean = false;
  showInviteAdminInput: boolean = false;
  isLoading: boolean = false;
  reloadData: boolean = false;
//   locationsCounting = new CountLocationModel();
  locationsCounting : any;
  orgAdministratorRadio: object[] = [
    {
      id: 1,
      text: "No, I'll manage myself"
    }, {
      id: 2,
      text: "Yes, I would like someone to manage with me"
    }
  ];

  requestStatus = {
    active: RequestStatusEnum.Active,
    pending: RequestStatusEnum.Pending,
    inactive: RequestStatusEnum.Inactive
  };
  //
  selectedTab = this.requestStatus.active;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private childRequestService: ChildRequestService) {
  }

  ngOnInit(): void {
  }

  handleRadioValueChange(e) {
    if (e.value.id == 2) {
      this.showInviteAdminInput = true;
    } else {
      this.showInviteAdminInput = false;
    }
  }

  onLoadLocationCounting() {
    this.childRequestService.getLocationCounting().subscribe((result) => {
    //   this.locationsCounting = result;
    });
  }

  asyncValidationOrgName(params) {
    const orgNameTemp = 'test';
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(params.value !== orgNameTemp);
      }, 300);
    });
  }

  onSelectTab(status: RequestStatusEnum) {
    this.selectedTab = status;
  }

  loadLocationCounting() {
    this.childRequestService.getLocationCounting().subscribe((result) => {
    //   this.locationsCounting = result;
    });
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
