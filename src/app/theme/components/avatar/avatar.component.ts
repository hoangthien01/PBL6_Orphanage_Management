import { Component, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
//
import { AppNotify, CommonFunction } from 'src/app/utilities';
import { AVATAR_PARENT_COMPONENT } from '@app/shared/app.constants';
import { AttachmentModel } from '@app/shared/models';
import { svgIconAvatarDefault, svgIconAvatarLogo } from 'src/assets/images/svg-icons.constants';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { EmployeeService } from '@app/modules/employee/services/employee-management.service';
import { EmployeeModel } from '@app/modules/employee/models';
import { ChildrenModel } from './../../../modules/children/models/children.model';
import { ChildrenService } from '@app/modules/children/services/children-management.service';
import * as UserActions from '@app/core/store/user/user.actions';
//
@Component({
    selector: 'app-profile-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class ProfileAvatarComponent implements OnDestroy {

    @ViewChild('uploadImg') uploadImg: ElementRef;
    @ViewChild('avatar') avatarImg: ElementRef;
    //
    @Input() fileAvatarName: string;
    @Input() logoTitle: string;
    @Input() chatBoxId: string;
    @Input() avatarParentComponent: string;
    @Input() disabled: boolean = false;
    @Input() isUpdatingProfile: boolean = false;
    @Input() data: EmployeeModel = new EmployeeModel();
    @Input() child: ChildrenModel;
    @Output() avatarUpdated: EventEmitter<string> = new EventEmitter<string>();

    AVATAR_PARENT_COMPONENT = AVATAR_PARENT_COMPONENT;
    CommonFunction = CommonFunction;
    SVG_ICONS = {
        AvatarDefault: svgIconAvatarDefault.data,
        AvatarLogo: svgIconAvatarLogo.data
    };

    file: any;
    attachmentPreviewed: AttachmentModel;
    isUpdating: boolean;
    isDeleting: boolean;
    showAttachmentPreviewPopup: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store,
                private _userService: UserService,
                private _employeeService: EmployeeService,
                private _childService: ChildrenService) {
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    async removeAvatar() {
        if (this.isDeleting || this.isUpdating) {
            return;
        }

        let confirmMessage;
        let confirmTitle;
        switch (this.avatarParentComponent) {
            case AVATAR_PARENT_COMPONENT.profile:
                confirmTitle = 'Remove profile picture';
                confirmMessage = 'Are you sure you want to remove the profile picture?';
                break;

            case AVATAR_PARENT_COMPONENT.chatBoxAppearance:
                confirmTitle = 'Remove company logo';
                confirmMessage = 'Are you sure you want to remove the company logo?';

                break;
        }

        const confirm = await CommonFunction.confirmDeleteDialogPromise(confirmTitle,
            confirmMessage, 'REMOVE');
        if (confirm) {
          this.removeProfilePhoto();
        }
    }

    updateImg() {
        if (this.isDeleting || this.isUpdating) {
            return;
        }

        this.uploadImg.nativeElement.click();
    }

    fileChangeEvent(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (!file) {
                return;
            }

            if (!file.type || file.type.split('/')[0] !== 'image') {
                AppNotify.error('Only accept image file!');
                return;
            }

            if (file.size > (1048576 * 2)) {
                AppNotify.error('Maximum size of image is 2MB!');
                return;
            }

            this.file = file;
            if (this.child) {
              this.child.personal_picture = this.file;
            } else {
              this.data.avatar = this.file;
            }
            this.setAsProfilePhoto();
        }
    }

    setAsProfilePhoto() {
        if (this.isUpdating) {
            return;
        }
        this.isUpdating = true;
        if (this.child) {
          this._childService.updateChild(this.child).pipe(
            finalize(() => {
                this.isUpdating = false;
                (document.getElementById('upload-avatar') as any).value = null;
            })
          ).subscribe((res) => {
            this.fileAvatarName = res.personal_picture;
            this.avatarUpdated.emit(res.personal_picture);
            AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'changed'));
          });
        } else {
          this._employeeService.updateEmployee(this.data).pipe(
            finalize(() => {
                this.isUpdating = false;
                (document.getElementById('upload-avatar') as any).value = null;
            })
          ).subscribe((res) => {
            this.fileAvatarName = res.avatar;
            this.avatarUpdated.emit(res.avatar);

            if (this.isUpdatingProfile) {
              this._store.dispatch(new UserActions.UpdateUserAvatar(res.avatar));
            }
            //
            AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'changed'));
          });
        }
    }

    private removeProfilePhoto() {
        this.isDeleting = true;
        this.data.avatar = '';
        if (this.child) {
          this._childService.removeAvatar(this.child.id).pipe(
            finalize(() => {
                this.isDeleting = false;
                (document.getElementById('upload-avatar') as any).value = null;
            })
        ).subscribe(() => {
            this.fileAvatarName = null;
            this.avatarUpdated.emit(null);
            //
            AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'removed'));
        });
        } else {
          this._employeeService.removeAvatar(this.data.id).pipe(
              finalize(() => {
                  this.isDeleting = false;
                  (document.getElementById('upload-avatar') as any).value = null;
              })
          ).subscribe(() => {
              this.fileAvatarName = null;
              this.avatarUpdated.emit(null);
              if (this.isUpdatingProfile) {
                this._store.dispatch(new UserActions.UpdateUserAvatar(null));
              }
              //
              AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'removed'));
          });
        }
    }

    previewAvatar(avatarUrl: string) {
        this.attachmentPreviewed = new AttachmentModel({
            url: avatarUrl,
            isInlineImage: true
        });
        this.showAttachmentPreviewPopup = true;
    }
}
