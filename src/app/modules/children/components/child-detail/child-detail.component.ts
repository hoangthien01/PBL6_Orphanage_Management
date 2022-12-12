import { cloneDeep, isEqual } from 'lodash-es';
import {Component, EventEmitter, OnInit, Output, ViewChild, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {debounceTime, finalize} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
import {DxPopupComponent} from 'devextreme-angular/ui/popup';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';

//
import { AppNotify, CommonFunction } from 'src/app/utilities';
// import {ProspectStatusNewType} from '@app/shared/enums';
import {COMMON_MESSAGE, PROSPECT_MESSAGE} from '@app/shared/message';
import {AVATAR_PARENT_COMPONENT, GENDER_TYPES, POPUP_ANIMATION} from '@app/shared/app.constants';
import {BaseService} from '@app/core/services';
import { ChildrenModel } from '../../models';
import { ChildrenService } from '../../services/children-management.service';
import { ActivatedRoute } from '@angular/router';
import { UserSelectors } from '@app/core/store';
import { UserService } from '@app/modules/account-setting/services/user.service';

@Component({
    selector: 'app-child-detail',
    templateUrl: './child-detail.component.html',
    styleUrls: ['./child-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildDetailComponent implements OnInit, OnDestroy {
    private _visible: boolean;
    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }
    @Input() childId: string;
    //
    @Output() refreshGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    //
    prospectMessages = PROSPECT_MESSAGE;
    POPUP_ANIMATION = POPUP_ANIMATION;
    genderLookup = GENDER_TYPES;

    isProcessing: boolean = false;

    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;
    //
    AVATAR_PARENT_COMPONENT = AVATAR_PARENT_COMPONENT;
    GENDER_TYPES = GENDER_TYPES;
    //
    child: ChildrenModel = new ChildrenModel();
    childCloned: ChildrenModel;
    isInit: boolean = false;
    isSaving: boolean = false;
    isDataChanged: boolean = false;
    isDataValid: boolean = false;
    isLoading: boolean = false;
    isPhoneNumberValid: boolean = true;
    isEmailExisted: boolean = false;
    //
    private _emailChanged$: Subject<string> = new Subject<string>();
    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService,
                private _childService: ChildrenService,
                private _cdr: ChangeDetectorRef,
                private _route: ActivatedRoute,
                private _userService: UserService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
          this.isDataChanged = this.checkIsDataChanged();
          this.isDataValid = this.checkIsDataValid();
          this._cdr.detectChanges();
      }));
    }

    ngOnInit() {
      this.getProfileGeneralInfo();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }


    resetPopup() {
        this.child = new ChildrenModel();
    }

    hidePopup() {
        this.visible = false;
    }

    getProfileGeneralInfo() {
      this.isLoading = true;
      this._childService.getChild(this.childId).pipe(finalize(() => {
          this.isLoading = false;
          this.isInit = true;
          this._cdr.detectChanges();
      })).subscribe((res) => {
          // handle the case, DB haven't had or updated this field
          this.child = res;
          this.childCloned = cloneDeep(this.child);
      });
  }

  updateProfileGeneralInfo() {
      if (!(this.isDataChanged && this.isDataValid) || this.isSaving) {
          return;
      }
      //
      this.isSaving = true;
      this._childService.updateChild(this.child).pipe(finalize(() => {
          this.isSaving = false;
          this._cdr.detectChanges();
      })).subscribe(() => {
          AppNotify.success('Cập nhật thông tin trẻ thành công');
          //
          this.cloneDataAfterSavingSuccess();
          this.refreshGrid.emit(true);
          // this._userService.updateUserName.emit(this.profileGeneralInfo.name);
          // this._store.dispatch(new UserActions.UpdateUserName(this.profileGeneralInfo.name));
          //
          this.dataChanged();
      },
      error => AppNotify.error(error));
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
      this.hidePopup();
  }

  cloneDataAfterSavingSuccess() {
      this.childCloned = cloneDeep(this.child);
  }

  rollbackToNonEditingData() {
      this.child = cloneDeep(this.childCloned);
      this.hidePopup();
  }

  //#region Data Handler
  dataChanged() {
      this._valueChanged$.next();
  }

  checkIsDataChanged(): boolean {
    return !isEqual(this.childCloned, this.child);
  }

  checkIsDataValid(): boolean {
      return !!this.child.name;
  }
  //#endregion

  //#region Handle Validation
  onEmailChanged(params: { event: Event; value: string }) {
      const isUserTyped: boolean = !!params.event;
      if (!!isUserTyped) {
          this._emailChanged$.next(params.value);
      }
  }

  //#endregion

  //#region Avatar
  onAvatarUpdated(avatarUrl: string) {
      this.child.personal_picture = avatarUrl;
      this.childCloned.personal_picture = avatarUrl;
  }

  //#endregion

  //#region Helper
  copyToClipboard(value: string) {
      CommonFunction.copyToClipBoard(value);
  }
  //#endregion

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
}




