import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { assign } from 'lodash';
import { AppNotify } from '@app/utilities';
import { Subscription } from 'rxjs';
import { ChildRequestService } from '../../data/services/child-request.service';

@Component({
  selector: 'app-child-request-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class ChildReuqestEditFormComponent implements OnInit {
  organizationId: string;
  subscription = new Subscription();
//   organization = new OrganizationModel();
  organization: any;
  oldOrganizationName: string;
  isLoading: boolean = false;
  isConfirmDeletePopup: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _location: Location,
    private childRequestService: ChildRequestService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.organizationId = params.get('id');
    });
    this.getOrganization();
  }

  getOrganization() {
    this.childRequestService.getOrganizationById(this.organizationId).subscribe(
      (result) => {
        this.organization = Object(assign(this.organization, result));
        this.oldOrganizationName = this.organization.name;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  backToPrevious() {
    this._location.back();
  }

  onSaveChanges(e) {
    const res = e.validationGroup.validate();
    res.status === 'pending' &&
      res.complete.then((r) => {
        if (r.status === 'invalid') {
          AppNotify.error('Some fields are invalid');
          return false;
        } else {
          this.isLoading = true;
          this.childRequestService.updateOrganization(this.organizationId, this.organization).subscribe(
            (result) => {
              this.isLoading = false;
              this.oldOrganizationName = result.name;
              AppNotify.success('Updated organization successfully');
              this.backToPrevious();
            },
            (error) => {
              this.isLoading = false;
              AppNotify.error(error);
            }
          );
        }
      });
  }

  onDeleteOrganization(status) {
    if (status) {
      this.childRequestService.deleteOrganization(this.organizationId).subscribe(
        (result) => {
          this.isConfirmDeletePopup = false;
          this.backToPrevious();
          AppNotify.success('Delete organization successfully');
        },
        (error) => {
          this.isConfirmDeletePopup = false;
          AppNotify.error(error);
        }
      );
    } else {
      this.isConfirmDeletePopup = false;
    }
  }

  openDeleteOrganizationPopup() {
    this.isConfirmDeletePopup = true;
  }
}
