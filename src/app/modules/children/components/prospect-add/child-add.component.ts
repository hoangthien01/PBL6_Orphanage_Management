import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {Key} from 'ts-keycode-enum';
import { Store } from '@ngxs/store';
import {DxPopupComponent} from 'devextreme-angular/ui/popup';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';

//
import { CommonFunction } from 'src/app/utilities';
// import {ProspectStatusNewType} from '@app/shared/enums';
import {PROSPECT_MESSAGE} from '@app/shared/message';
import {GENDER_TYPES, POPUP_ANIMATION, PROSPECT_FIELD_NAMES} from '@app/shared/app.constants';
import {ListItemModel } from '@app/shared/models';
import {BaseService} from '@app/core/services';
import { ChildrenModel } from '../../models';

@Component({
    selector: 'app-child-add',
    templateUrl: './child-add.component.html',
    styleUrls: ['./child-add.component.scss']
})
export class ChildAddComponent implements OnInit, OnDestroy {
    @ViewChild('addProspectPopup') addProspectPopup: DxPopupComponent;
    @ViewChild('firstNameTextBox') firstNameTextBox: DxTextBoxComponent;
    @ViewChild('lastNameTextBox') lastNameTextBox: DxTextBoxComponent;
    @ViewChild('emailTextBox') emailTextBox: DxTextBoxComponent;
    @ViewChild('addNewProspectValidationGroup') addNewProspectValidationGroup: DxValidationGroupComponent;
    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;

    private _visible: boolean;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }
    @Input() userAssignSource: ListItemModel<string, string>[] = [];

    @Output() refreshGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    fieldName = PROSPECT_FIELD_NAMES;
    prospectMessages = PROSPECT_MESSAGE;
    POPUP_ANIMATION = POPUP_ANIMATION;
    genderLookup = GENDER_TYPES;

    child: ChildrenModel = new ChildrenModel();

    isDataValid: boolean = false;
    isProcessing: boolean = false;
    isPhoneNumberFormatValid: boolean = true;
    isPhoneNumberUnique: boolean = true;
    isEmailValidating: boolean = false;
    isEmailExisted: boolean = false;

    private _valueChanged$: Subject<void> = new Subject<void>();
    private _emailChanged$: Subject<string> = new Subject<string>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataValid = this.checkIsDataValid();
        }));

        // this._subscribeEmailExistedValidation();
    }

    @HostListener('document:keydown.escape', ['$event']) onEscapeHandle(event: KeyboardEvent) {
        const isEscClicked = CommonFunction.IsKeyCodeMatch(event, Key.Escape, 'Escape');
        if (isEscClicked && this.visible) { // ESC
            this.hidePopup();
        }
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    focusToFirstNameTextBox() {
        setTimeout(() => {
            this.firstNameTextBox.instance.focus();
        }, 300);
    }

    checkIsDataValid(): boolean {
        // if ((!prospect.firstName || !prospect.firstName.trim()) &&
        //     (!prospect.lastName || !prospect.lastName.trim()) &&
        //     (!prospect.email || !prospect.email.trim())
        //     || this.isEmailExisted) {
        //     return false;
        // }

        // Check valid for email field
        // const emailValid: boolean = !!prospect.email ? this.emailTextBox.isValid : true;

        // return phoneValid && emailValid;
        return true;
    }

    addProspect(isKeepPopup: boolean) {
        if (!this.isDataValid || this.isEmailValidating) {
            return;
        }

        this.isProcessing = true;
        // this.prospect.isSaving = true;
        // this.prospect.leadStatus = ProspectStatusNewType.Inactive;

        // format phone number
        //
        // this.prospectService.createProspect(this.prospect)
        //     .pipe(
        //         finalize(() => {
        //             this.prospect.isSaving = false;
        //             this.isProcessing = false;
        //         })
        //     )
        //     .subscribe(res => {
        //         if (res) {
        //             AppNotify.success(AppNotify.generateSuccessMessage('contact', 'added'));
        //             if (isKeepPopup) {
        //                 this.resetPopup();
        //                 this.focusToFirstNameTextBox();
        //             } else {
        //                 this.hidePopup();
        //             }

        //             this.refreshGrid.emit(true);
        //         }
            // });
    }

    resetPopup() {
        // this.prospect = new ProspectModel();
        // this.phoneNumberElement.phoneTextBox.instance.reset();
    }

    hidePopup() {
        this.visible = false;
    }

    dataChanged() {
        this._valueChanged$.next();
    }

    /**
     * Event Handler
     */
    onPhoneNumberContentReady() {
        this.cdr.detectChanges();
    }

    onPhoneNumberValidChanged(params: { isFormatValid: boolean }) {
        this.isPhoneNumberFormatValid = params.isFormatValid;
        this.dataChanged();
    }

    /**
     * Handle validation
     */
    emailExistedValidationCallback = (params: { value: string }) => {
        return !params.value || !params.value.trim()
            ? true
            : !this.isEmailExisted;
    };

    onEmailChanged(params: { event: Event; value: string }) {
        const isUserTyped: boolean = !!params.event;
        if (!!isUserTyped) {
            this._emailChanged$.next(params.value);
        }
    }

    private _subscribeEmailExistedValidation() {
        // this._subscriptions.add(this._emailChanged$.pipe(
        //     debounceTime(500),
        //     switchMap((email: string) => {
        //         if (!email || !email.trim()) {
        //             return of(false);
        //         }
        //         this.isEmailValidating = true;
        //         //
        //         DevExtremeValidationHelper.setValidationStatusIsPending(this.emailTextBox);
        //         //
        //         return this.prospectService.checkingExistEmail('', email.trim()).pipe(
        //             catchError((_error) => EMPTY),
        //             finalize(() => {
        //                 this.isEmailValidating = false;
        //                 this.dataChanged();
        //             }),
        //         );
        //     })
        // ).subscribe((isExisted: boolean) => {
        //     this.isEmailExisted = isExisted;
        //     this.emailValidator.instance.validate();
        // }));
    }

    // usedPhoneNumberAsyncValidationCallback = () => {
    //     return new Promise((resolve, reject) => {
    //         switch (true) {
    //             case !this.phoneNumberDataSource.postfix && this.isPhoneNumberFormatValid:
    //                 this.isPhoneNumberUnique = true;
    //                 return reject();
    //             case this.isProcessing:
    //             case !this.isPhoneNumberFormatValid:
    //                 return reject();
    //         }

    //         setTimeout(() => {
    //             this.prospectService.checkingExistPhoneNumber('', this.phoneNumberDataSource.postfix, this.phoneNumberDataSource.selectedCountry.dialCode)
    //                 .pipe(
    //                     debounceTime(500),
    //                     finalize(() => {
    //                         this.dataChanged();
    //                     })
    //                 ).subscribe((isExisted: boolean) => {
    //                     resolve(!isExisted);
    //                     this.isPhoneNumberUnique = !isExisted;
    //                 }, error => {
    //                     reject();
    //                 });
    //         }, 150);
    //     });
    // };
}
