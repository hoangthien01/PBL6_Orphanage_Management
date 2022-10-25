import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../../services/employee-management.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { isEqual, cloneDeep } from 'lodash-es';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
import { Store } from '@ngxs/store';
//
import { COMMON_MESSAGE } from '@app/shared/message';
import { AVATAR_PARENT_COMPONENT } from '@app/shared/app.constants';
import { CommonFunction } from 'src/app/utilities';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { CanComponentDeactivate } from '@app/core/guards';
import { EmployeeModel } from '@app/modules/employee/models';
import { ProfileService } from '@app/modules/profile/services/employee-management.service';
import { UserSelectors } from '@app/core/store';

@Component({
    selector: 'app-profile-general-info',
    templateUrl: './profile-general-info.component.html',
    styleUrls: ['./profile-general-info.component.scss']
})
export class ProfileGeneralInfoComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @ViewChild('accountEmailTextBox') accountEmailTextBox: DxTextBoxComponent;
    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;
    //
    @Input() employeeId: string;
    //
    userId$: Observable<string> = this._store.select<string>(UserSelectors.userId);
    //
    AVATAR_PARENT_COMPONENT = AVATAR_PARENT_COMPONENT;
    //
    employee: EmployeeModel = new EmployeeModel();
    employeeCloned: EmployeeModel;
    userId: string;
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
                private _route: ActivatedRoute,
                private _employeeService: EmployeeService,
                private _profileService: ProfileService,
                private _userService: UserService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataChanged = this.checkIsDataChanged();
            this.isDataValid = this.checkIsDataValid();
        }));
    }

    ngOnInit() {
        this._subscriptions.add(this.userId$.subscribe((userId) => {
          this.userId = userId;
        }))
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
        if (!this.employeeId) {
          this._profileService .getProfile(this.userId).pipe(finalize(() => {
            this.isLoading = false;
            this.isInit = true;
        })).subscribe((res) => {
            this.employee = res;
            this.employeeCloned = cloneDeep(this.employee);
        });
        } else {
          const id = this._route.snapshot.paramMap.get('id')!;
          this._employeeService.getEmployee(id).pipe(finalize(() => {
              this.isLoading = false;
              this.isInit = true;
          })).subscribe((res) => {
              // handle the case, DB haven't had or updated this field
              this.employee = res;
              //
              this.employeeCloned = cloneDeep(this.employee);
          });
        }
    }

    updateProfileGeneralInfo() {
        if (!(this.isDataChanged && this.isDataValid) || this.isSaving) {
            return;
        }

        this.isSaving = true;
        //
        // this._userService.updateProfileGeneralInfo(this.profileGeneralInfo).pipe(finalize(() => {
        //     this.isSaving = false;
        // })).subscribe(() => {
        //     AppNotify.success(AppNotify.generateSuccessMessage('profile', 'updated'));
        //     //
        //     this.cloneDataAfterSavingSuccess();
        //     // this._userService.updateUserName.emit(this.profileGeneralInfo.name);
        //     this._store.dispatch(new UserActions.UpdateUserName(this.profileGeneralInfo.name));
        //     //
        //     this.dataChanged();
        // });
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
        this.employeeCloned = cloneDeep(this.employee);
    }

    rollbackToNonEditingData() {
        this.employee = cloneDeep(this.employeeCloned);
    }

    openChangePassword() {
        this.isShowChangePasswordPopup = true;
    }

    //#region Data Handler
    dataChanged() {
        this._valueChanged$.next();
    }

    checkIsDataChanged(): boolean {
      return !isEqual(this.employeeCloned, this.employee);
    }

    checkIsDataValid(): boolean {
        return !!this.employeeCloned.name && !!this.employeeCloned.personal_email;
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

    // private _subscribeEmailExistedValidation() {
    //     this._subscriptions.add(this._emailChanged$.pipe(
    //         debounceTime(350),
    //         switchMap((email: string) => {
    //             if (!email || !email.trim()) {
    //                 return of(false);
    //             }
    //             //
    //             DevExtremeValidationHelper.setValidationStatusIsPending(this.accountEmailTextBox);
    //             //
    //             return this._userService.checkingExistEmail(this.profileGeneralInfo.id, email.trim()).pipe(
    //                 catchError((_error) => EMPTY),
    //                 finalize(() => {
    //                     this.dataChanged();
    //                 }),
    //             );
    //         })
    //     ).subscribe((isExisted: boolean) => {
    //         this.isEmailExisted = isExisted;
    //         this.emailValidator.instance.validate();
    //     }));
    // }

    //#endregion

    //#region Avatar
    onAvatarUpdated(avatarUrl: string) {
        this.employee.avatar = avatarUrl;
        this.employeeCloned.avatar = avatarUrl;
    }

    //#endregion

    //#region Helper
    copyToClipboard(value: string) {
        CommonFunction.copyToClipBoard(value);
    }
    //#endregion
}
