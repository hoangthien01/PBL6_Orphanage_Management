import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, debounceTime, finalize, switchMap } from 'rxjs/operators';
import { EMPTY, of, Subject, Subscription } from 'rxjs';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
//
import {AppNotify, ERROR, RegexObject, DevExtremeValidationHelper} from 'src/app/utilities';
import {ACCOUNT_MESSAGE} from '@app/shared/message';
import {UserService} from '@app/modules/account-setting/services/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {
    @ViewChild('emailTextBox') emailTextBox: DxTextBoxComponent;
    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;

    email: string;

    isRegistered: boolean = false;
    isLoading: boolean = false;
    isDataValid: boolean = false;

    private _emailChanged$: Subject<string> = new Subject<string>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private router: Router,
                private _userService: UserService) {
        this._subscribeEmailExistedValidation();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    dataChanged() {
        this.isDataValid = RegexObject.checkEmailIsValid(String(this.email)) && this.isRegistered;
    }

    forgotPassword() {
        if (this.isLoading || !this.isDataValid) {
            return;
        }
        this.removeSpaces();
        this.isLoading = true;
        this._userService.forgotPassword(this.email).pipe(
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe((res) => {
            if (res) {
                AppNotify.info(ACCOUNT_MESSAGE.SentPassword);
                this.router.navigate(['auth/login']).then();
            } else {
                AppNotify.warning(ERROR);
            }
        });
    }

    goToLogin() {
        this.router.navigate(['auth/login']).then();
    }

    removeSpaces() {
        if (this.email) {
            this.email = this.email.replace(/\s/g, '');
        }
    }

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
            : this.isRegistered;
    };

    private _subscribeEmailExistedValidation() {
        this._subscriptions.add(this._emailChanged$.pipe(
            debounceTime(350),
            switchMap((email: string) => {
                if (!email || !email.trim()) {
                    return of(false);
                }
                //
                DevExtremeValidationHelper.setValidationStatusIsPending(this.emailTextBox);
                //
                // return this._userService.checkingExistEmail('', email.trim()).pipe(
                //     catchError((_error) => EMPTY),
                //     finalize(() => {
                        this.dataChanged();
                    // }),
                // );
                return of(true);
            })
        ).subscribe((isExisted: boolean) => {
            this.isRegistered = isExisted;
            this.emailValidator.instance.validate();
        }));
    }
}
