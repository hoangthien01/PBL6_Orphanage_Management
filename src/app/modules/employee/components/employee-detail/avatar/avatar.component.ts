import { Component, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
//
import { AppNotify, CommonFunction } from 'src/app/utilities';
import { AVATAR_PARENT_COMPONENT } from '@app/shared/app.constants';
import { AttachmentModel } from '@app/shared/models';
import { svgIconAvatarDefault, svgIconAvatarLogo } from 'src/assets/images/svg-icons.constants';
import { UserService } from '@app/modules/account-setting/services/user.service';

@Component({
    selector: 'app-profile-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
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
                private _userService: UserService) {
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
        }
    }

    setAsProfilePhoto() {
        if (this.isUpdating) {
            return;
        }

        this.isUpdating = true;
        // this._userService.updateAvatar(this.file, this._webSocketService.connectionId).pipe(
        //     finalize(() => {
        //         this.isUpdating = false;

        //         (document.getElementById('upload-avatar') as any).value = null;
        //     })
        // ).subscribe((avatar) => {
        //     this.fileAvatarName = avatar;
        //     this.avatarUpdated.emit(avatar);
        //     this._store.dispatch(new UserActions.UpdateUserAvatar(avatar));
        //     //
        //     AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'changed'));
        // });
    }

    private removeProfilePhoto() {
        this.isDeleting = true;
        // this._userService.deleteAvatar(this._webSocketService.connectionId).pipe(
        //     finalize(() => {
        //         this.isDeleting = false;
        //         (document.getElementById('upload-avatar') as any).value = null;
        //     })
        // ).subscribe(() => {
        //     this.fileAvatarName = null;
        //     this.avatarUpdated.emit(null);
        //     this._store.dispatch(new UserActions.UpdateUserAvatar(null));
        //     //
        //     AppNotify.success(AppNotify.generateSuccessMessage('avatar', 'removed'));
        // });
    }

    previewAvatar(avatarUrl: string) {
        this.attachmentPreviewed = new AttachmentModel({
            url: avatarUrl,
            isInlineImage: true
        });
        this.showAttachmentPreviewPopup = true;
    }
}
