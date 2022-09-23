import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { catchError, debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import { EMPTY, of, Subject, Subscription } from 'rxjs';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
//
import {ACCOUNT_MESSAGE} from '@app/shared/message';
import { svgIconCheckSharpSmall } from 'src/assets/images/svg-icons.constants';
import { CommonFunction, DevExtremeValidationHelper } from 'src/app/utilities';
import {RegisteredAccountModel, SignInModel} from '@app/modules/account-setting/models';
import {AccountService} from '@app/modules/account-setting/services/account.service';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { AuthResultModel } from '@app/core/store/models';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                opacity: 1,
            })),
            state('closed', style({
                opacity: 0,
            })),
            transition('open => closed', [
                animate('2s')
            ]),
            transition('closed => open', [
                animate('1s')
            ]),
        ]),
    ],
})
export class SignUpComponent implements OnInit, OnDestroy {
    @ViewChild('email') emailTextBox: DxTextBoxComponent;
    @ViewChild('fullName') fullNameTextBox: DxTextBoxComponent;
    @ViewChild('companyName') companyNameTextBox: DxTextBoxComponent;
    @ViewChild('password') passwordTextBox: DxTextBoxComponent;
    @ViewChild('confirmPassword') confirmPasswordTextBox: DxTextBoxComponent;
    @ViewChild('confirmPasswordValidation') confirmPasswordValidation: DxValidatorComponent;
    @ViewChild('emailValidator') emailValidator: DxValidatorComponent;

    SVG_ICONS = {
        CheckSharpSmall: svgIconCheckSharpSmall.data
    };
    accountMessages = ACCOUNT_MESSAGE;

    account: RegisteredAccountModel = new RegisteredAccountModel();
    stepSignUp = {
        accountInfo: 1,
        creditCard: 2
    };
    currentStep: number = this.stepSignUp.accountInfo;
    startTrialMessage: string = 'Start Your FREE 14 Day Trial!';
    creditCard = {
        stripe: {},
        cardNumberElement: {},
        creditCard: {},
        isFormValid: false
    };
    userLogin: AuthResultModel = new AuthResultModel();

    trialDay: number;
    baseCharge: number;
    planName: string;

    isDataValid: boolean = false;
    isRegistering: boolean = false;
    isEmailExisted: boolean = false;
    isEmailValidating: boolean = false;

    private _valueChangedSubject$: Subject<string> = new Subject<string>();
    private _emailChanged$: Subject<string> = new Subject<string>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private accountService: AccountService,
                private userService: UserService,
                private router: Router) {
        this._subscribeEmailExistedValidation();
    }

    ngOnInit() {
        this._valueChangedSubject$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
        ).subscribe(() => {
            this.isDataValid = this.checkFormIsValid();
        });

    }

    ngOnDestroy(): void {
        this._valueChangedSubject$.unsubscribe();
        this._subscriptions.unsubscribe();
    }

    checkFormIsValid() {
        // const registerAccount = this.account;
        // if (this.account.isSaving || this.isEmailExisted) {
        //     return false;
        // }
        // //
        // const hasEmptyValue: boolean = (!registerAccount.name || !registerAccount.name.trim())
        //     || (!registerAccount.companyName || !registerAccount.companyName.trim())
        //     || (!registerAccount.email || !registerAccount.email.trim())
        //     || (!registerAccount.password || !registerAccount.password.trim())
        //     || (!registerAccount.confirmPassword || !registerAccount.companyName.trim());

        // const isInputValid: boolean = this.emailTextBox.isValid
        //     && this.companyNameTextBox.isValid
        //     && this.fullNameTextBox.isValid
        //     && this.passwordTextBox.isValid
        //     && this.confirmPasswordTextBox.isValid;
        // return !hasEmptyValue && isInputValid;
        return true;
    }

    /**
     * Validation Handler
     */
    dataChanged() {
        this._valueChangedSubject$.next(Math.random().toString());
    }

    onEmailChanged(params: { event: Event; value: string }) {
        const isUserTyped: boolean = !!params.event;
        if (!!isUserTyped) {
            this._emailChanged$.next(params.value);
        }
    }

    private _subscribeEmailExistedValidation() {
        this._subscriptions.add(this._emailChanged$.pipe(
            debounceTime(350),
            switchMap((email: string) => {
                if (!email || !email.trim()) {
                    return of(false);
                }
                // return of(true);
                // this.isEmailValidating = true;
                //
                // DevExtremeValidationHelper.setValidationStatusIsPending(this.emailTextBox);
                //
                // return this.userService.checkingExistEmail('', email.trim()).pipe(
                //     catchError((_error) => EMPTY),
                //     finalize(() => {
                //         this.isEmailValidating = false;
                //         this.dataChanged();
                //     }),
                // );
            })
        ).subscribe((isExisted : any) => {
            this.isEmailExisted = isExisted;
            this.emailValidator.instance.validate();
        }));
    }

    emailExistedValidationCallback = (params: { value: string }) => {
        return !params.value || !params.value.trim()
            ? true
            : !this.isEmailExisted;
    };

    passwordComparison = () => {
        return this.account.password;
    };

    /**
     * Event Handler
     */

    onCreatePasswordChanged(e) {
	    if (this.account.confirmPassword) {
            this.confirmPasswordValidation.instance.validate();
        }
	    //
	    this.dataChanged();
    }

    async registerAccount() {
        if (this.isRegistering) {
            return;
        }

        this.isRegistering = true;
        this.userService.register(this.account).pipe(finalize(() => {
            this.isRegistering = false;
        })).subscribe(res => {
            if (res) {
            this.userLogin = res;
            // this.autoLogin();
            }
          // eslint-disable-next-line @typescript-eslint/no-shadow
          }, error => {
            const messageError = !!error.error && !!error.error.message ? error.error.message : 'Something bad happened; please try again later.';
            this.accountService.authErrorMessage.emit(messageError);
          }
        );
    }

    removeSpaces() {
        if (this.account.email) {
            this.account.email = this.account.email.replace(/\s/g, '');
        }
    }

    goToTermOfService() {
        CommonFunction.goToTermOfService();
    }

    goToPrivacyPolicy() {
        CommonFunction.goToPrivacyPolicy();
    }

    nextToCreditPage() {
        if (!this.isDataValid || this.isRegistering) {
            return;
        }
        this.currentStep = this.stepSignUp.creditCard;
    }

    autoLogin() {
        // const autoLoginLink = '/access/' + this.userLogin.userId + '/' + this.userLogin.token + '#fromSignUp';
        // this.router.navigateByUrl(autoLoginLink).then();
    }
}
