import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { isEqual, cloneDeep } from 'lodash-es';
//
import { COMMON_MESSAGE } from '@app/shared/message';
import { CommonFunction } from 'src/app/utilities';
import { CanComponentDeactivate } from '@app/core/guards';
import { ChildRequestService } from '../../data/services/child-request.service';
import { ChildRequestDetailModel } from '../../models/child-request.model';
import { FAMILY_STATUS } from '@app/modules/client/data/const/family-status.const';
import { MARITAL_STATUS } from '@app/modules/client/data/const/marital-status.const';

@Component({
    selector: 'app-child-request-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildReuqestEditFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @Input() requestId: string;
    //
    requestDetail: ChildRequestDetailModel = new ChildRequestDetailModel();
    requestDetailCloned: ChildRequestDetailModel;
    FAMILY_STATUS = FAMILY_STATUS;
    MARITAL_STATUS = MARITAL_STATUS;
    //
    isInit: boolean = false;
    isSaving: boolean = false;
    isDataChanged: boolean = false;
    isDataValid: boolean = false;
    isLoading: boolean = false;
    //
    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _cdr: ChangeDetectorRef,
                private childRequestService: ChildRequestService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataChanged = this.checkIsDataChanged();
            this.isDataValid = this.checkIsDataValid();
            this._cdr.detectChanges();
        }));
    }

    ngOnInit() {
        this.isLoading = true;
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
        this.childRequestService.getRequestDetail(this.requestId)
        .pipe(finalize(() => {
            this.isLoading = false;
            this.isInit = true;
            this._cdr.detectChanges();
        })).subscribe((res) => {
            this.requestDetail = res;
            this.requestDetailCloned = cloneDeep(this.requestDetail);
        });
    }

    updateProfileGeneralInfo() {
        if (!(this.isDataChanged && this.isDataValid) || this.isSaving) {
            return;
        }
        //
        this.isSaving = true;
        // this._employeeService.updateEmployee(this.employee).pipe(finalize(() => {
        //     this.isSaving = false;
        //     this._cdr.detectChanges();
        // })).subscribe((res) => {
        //     AppNotify.success(AppNotify.generateSuccessMessage('profile', 'updated'));
        //     //
        //     this.cloneDataAfterSavingSuccess();
        //     // this._userService.updateUserName.emit(this.profileGeneralInfo.name);
        //     if (!this.employeeId) {
        //       this._store.dispatch(new UserActions.UpdateUserName(res.name));
        //     }
        //     //
        //     this.dataChanged();
        // },
        // error => AppNotify.error(error));
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
        this.requestDetailCloned = cloneDeep(this.requestDetail);
    }

    rollbackToNonEditingData() {
        this.requestDetail = cloneDeep(this.requestDetailCloned);
    }

    //#region Data Handler
    dataChanged() {
        this._valueChanged$.next();
    }

    checkIsDataChanged(): boolean {
      return !isEqual(this.requestDetailCloned, this.requestDetail);
    }

    checkIsDataValid(): boolean {
        return !!this.requestDetail.adopter.name;
    }
    //#endregion
}
