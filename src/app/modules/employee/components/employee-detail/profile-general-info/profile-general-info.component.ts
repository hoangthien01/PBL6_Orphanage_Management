import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, finalize, switchMap } from 'rxjs/operators';
import { isEqual, cloneDeep } from 'lodash-es';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
import { Store } from '@ngxs/store';
//
import { DevExtremeValidationHelper } from '@app/utilities';
import { COMMON_MESSAGE } from '@app/shared/message';
import { AVATAR_PARENT_COMPONENT } from '@app/shared/app.constants';
import { AppNotify, CommonFunction } from 'src/app/utilities';
import { ProfileGeneralInfoModel } from '@app/modules/account-setting/models';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { CanComponentDeactivate } from '@app/core/guards';
import { UserLookupSelectors, UserStorage } from '@app/core/store';
import * as UserActions from '@app/core/store/user/user.actions';

@Component({
    selector: 'app-profile-general-info',
    templateUrl: './profile-general-info.component.html',
    styleUrls: ['./profile-general-info.component.scss']
})
export class ProfileGeneralInfoComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @ViewChild('accountEmailTextBox') accountEmailTextBox: DxTextBoxComponent;
    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;

    AVATAR_PARENT_COMPONENT = AVATAR_PARENT_COMPONENT;
    profileGeneralInfo = new ProfileGeneralInfoModel();
    profileCloned: { profileGeneralInfo: ProfileGeneralInfoModel; postfixPhoneNumber: string; selectedCountryCode: string } = {
        profileGeneralInfo: null,
        postfixPhoneNumber: '',
        selectedCountryCode: null,
    };
    //
    isInit: boolean = false;
    isSaving: boolean = false;
    isDataChanged: boolean = false;
    isDataValid: boolean = false;
    isShowChangePasswordPopup: boolean = false;
    isLoading: boolean = true;
    isPhoneNumberValid: boolean = true;
    isEmailExisted: boolean = false;
    //
    private _emailChanged$: Subject<string> = new Subject<string>();
    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _cdr: ChangeDetectorRef,
                private _store: Store,
                private _userService: UserService) {
        this._subscribeEmailExistedValidation();
        //
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataChanged = this.checkIsDataChanged();
            this.isDataValid = this.checkIsDataValid();
        }));
    }

    ngOnInit() {
        this.getProfileGeneralInfo();
    }

    async canDeactivate(): Promise<boolean> {
        if (this.isDataChanged) {
            const isConfirmed: boolean = await CommonFunction.confirmDialogPromise(
                COMMON_MESSAGE.DiscardChanges,
                COMMON_MESSAGE.ConfirmDiscardChanges);
            if (isConfirmed) {
                this.isDataChanged = false;
            }
            return isConfirmed;
        }

        return true;
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    getProfileGeneralInfo() {
        this.isLoading = true;

        // this._userService.getProfileGeneralInfo().pipe(finalize(() => {
        //     this.isLoading = false;
        //     this.isInit = true;
        // })).subscribe((res) => {
        //     // handle the case, DB haven't had or updated this field
        //     this.profileGeneralInfo = new ProfileGeneralInfoModel(res);
        //     //
        //     this.profileCloned.profileGeneralInfo = cloneDeep(this.profileGeneralInfo);
        // });
    }

    updateProfileGeneralInfo() {
        if (!(this.isDataChanged && this.isDataValid) || this.isSaving) {
            return;
        }

        this.isSaving = true;
        //
        this._userService.updateProfileGeneralInfo(this.profileGeneralInfo).pipe(finalize(() => {
            this.isSaving = false;
        })).subscribe(() => {
            AppNotify.success(AppNotify.generateSuccessMessage('profile', 'updated'));
            //
            this.cloneDataAfterSavingSuccess();
            // this._userService.updateUserName.emit(this.profileGeneralInfo.name);
            this._store.dispatch(new UserActions.UpdateUserName(this.profileGeneralInfo.name));
            //
            this.dataChanged();
        });
    }

    async cancelUpdate() {
        if (this.isDataChanged) {
            const isConfirmed: boolean = await CommonFunction.confirmDialogPromise('Cancel editing', COMMON_MESSAGE.ConfirmToCancel);
            if (isConfirmed) {
                this.rollbackToNonEditingData();
                //
                this.dataChanged();
            }
        }
    }

    cloneDataAfterSavingSuccess() {
        this.profileCloned.profileGeneralInfo = cloneDeep(this.profileGeneralInfo);
    }

    rollbackToNonEditingData() {
        this.profileGeneralInfo = cloneDeep(this.profileCloned.profileGeneralInfo);
    }

    openChangePassword() {
        this.isShowChangePasswordPopup = true;
    }

    //#region Data Handler
    dataChanged() {
        this._valueChanged$.next();
    }

    checkIsDataChanged(): boolean {
      return true;
        // return !isEqual(this.profileCloned.profileGeneralInfo, this.profileGeneralInfo)
        //     || phoneNumber !== phoneBackupNumber
        //     || this.phoneNumberDataSource.selectedCountry.iso2 !== this.profileCloned.selectedCountryCode;
    }

    checkIsDataValid(): boolean {
        return !!this.profileGeneralInfo.name && this.isPhoneNumberValid && !this.isEmailExisted;
    }
    //#endregion

    //#region Handle Validation
    onEmailChanged(params: { event: Event; value: string }) {
        const isUserTyped: boolean = !!params.event;
        if (!!isUserTyped) {
            this._emailChanged$.next(params.value);
        }
    }

    emailExistedValidationCallback = (params: { value: string }) => {
        return !params.value || !params.value.trim()
            ? true
            : !this.isEmailExisted;
    };

    private _subscribeEmailExistedValidation() {
        this._subscriptions.add(this._emailChanged$.pipe(
            debounceTime(350),
            switchMap((email: string) => {
                if (!email || !email.trim()) {
                    return of(false);
                }
                //
                DevExtremeValidationHelper.setValidationStatusIsPending(this.accountEmailTextBox);
                //
                return this._userService.checkingExistEmail(this.profileGeneralInfo.id, email.trim()).pipe(
                    catchError((_error) => EMPTY),
                    finalize(() => {
                        this.dataChanged();
                    }),
                );
            })
        ).subscribe((isExisted: boolean) => {
            this.isEmailExisted = isExisted;
            this.emailValidator.instance.validate();
        }));
    }

    //#endregion

    //#region Avatar
    onAvatarUpdated(avatarUrl: string) {
        this.profileGeneralInfo.avatar = avatarUrl;
        this.profileCloned.profileGeneralInfo.avatar = avatarUrl;
    }

    //#endregion

    //#region Helper
    copyToClipboard(value: string) {
        CommonFunction.copyToClipBoard(value);
    }
    //#endregion
}
