import { Component, ViewChild, EventEmitter, OnDestroy, HostListener, Input, Output } from '@angular/core';
import { Subscription, Subject, of, EMPTY } from 'rxjs';
import { catchError, debounceTime, finalize, switchMap } from 'rxjs/operators';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxValidationGroupComponent } from 'devextreme-angular/ui/validation-group';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
import { Key } from 'ts-keycode-enum';
//
import { AppNotify, CommonFunction, DevExtremeValidationHelper } from 'src/app/utilities';
import { POPUP_POSITION_CENTER } from '@app/shared/app.constants';
import { UserService } from '@app/modules/account-setting/services/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnDestroy {
    @ViewChild('changePasswordValidationGroup') changePasswordValidationGroup: DxValidationGroupComponent;
    @ViewChild('oldPasswordTextBox') oldPasswordTextBox: DxTextBoxComponent;
    @ViewChild('confirmPasswordTextBox') confirmPasswordTextBox: DxTextBoxComponent;
    @ViewChild('newPasswordTextBox') newPasswordTextBox: DxTextBoxComponent;
    @ViewChild('confirmPasswordValidation') confirmPasswordValidation: DxValidatorComponent;
    @ViewChild('oldPasswordValidator') oldPasswordValidator: DxValidatorComponent;

    private _visible: boolean;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    POPUP_POSITION_CENTER = POPUP_POSITION_CENTER;
    //
    toggleDisplayPopup: boolean;
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;

    isDataValid: boolean = false;
    isSaving: boolean = false;
    isOldPasswordValid: boolean = true;
    isCheckingOldPassword: boolean = false;

    oldPasswordChanged$: Subject<string> = new Subject<string>();
    valueChanged$: Subject<void> = new Subject<void>();
    subscription: Subscription = new Subscription();

    constructor(private userService: UserService) {
        this.subscribeOldPasswordValidation();
        //
        this.subscription.add(this.valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataValid =
                !!this.oldPasswordTextBox.value && !!this.newPasswordTextBox.value && !!this.confirmPasswordTextBox.value
                && this.isOldPasswordValid && this.newPasswordTextBox.isValid && this.confirmPasswordTextBox.isValid;
        }));
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        const isEscClicked = CommonFunction.IsKeyCodeMatch(event, Key.Escape, 'Escape');
        if (isEscClicked && this.visible) { // ESC
            this.visible = false;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    passwordComparison = () => this.newPassword;

    onNewPasswordChanged() {
        if (this.confirmPasswordValidation && !!this.confirmPassword) {
            this.confirmPasswordValidation.instance.validate();
        }
        //
        this.dataChanged();
    }

    updatePassword() {
        if (this.isSaving || !this.isDataValid) {
            return;
        }

        this.isSaving = true;
        this.userService.updatePassword(this.oldPassword, this.newPassword).pipe(
            finalize(() => this.isSaving = false))
            .subscribe(() => {
                AppNotify.success(AppNotify.generateSuccessMessage('password', 'changed'));
                //
                this.visible = false;
            });
    }

    dataChanged() {
        this.valueChanged$.next();
    }

    //#region OldPasswordValidation
    oldPasswordChanged(params: { value: string }) {
        this.oldPasswordChanged$.next(params.value);
    }

    oldPasswordValidationCallback = (params: { value: string }) => {
        return !params.value || !params.value.trim()
            ? true
            : this.isOldPasswordValid;
    };

    subscribeOldPasswordValidation() {
        this.subscription.add(this.oldPasswordChanged$.pipe(
            debounceTime(350),
            switchMap((oldPassword: string) => {
                if (!oldPassword || !oldPassword.trim()) {
                    return of(false);
                }
                //
                DevExtremeValidationHelper.setValidationStatusIsPending(this.oldPasswordTextBox);
                //
                // return this.userService.comparePassword(oldPassword.trim()).pipe(
                //     catchError((_error) => EMPTY),
                //     finalize(() => {
                //         this.dataChanged();
                //     }),
                // );
                return of(true);
            })
        ).subscribe((isValid: boolean) => {
            this.isOldPasswordValid = !!isValid;
            //
            this.oldPasswordValidator.instance.validate();
        }));
    }
    //#endregion
}
