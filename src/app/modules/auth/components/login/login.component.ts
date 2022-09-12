import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
//
import {CommonFunction, RegexObject} from 'src/app/utilities';
// import { DEVICE_TOKEN, PLATFORM_NAME } from '@app/core/store/user/user.storage';
// import {BaseService} from '@app/core/services';
import {SignInModel} from '@app/modules/account-setting/models';
// import {UserService} from '@app/modules/account-setting/services/user.service';
// import * as UserActions from '@app/core/store/user/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('emailTextBox') emailTextBox: DxTextBoxComponent;
    @ViewChild('passwordTextBox') passwordTextBox: DxTextBoxComponent;

    login: SignInModel = new SignInModel();
    userId: string;
    returnUrl: string;
    autofillDetection: { isEmailEnable: boolean; isPasswordEnable: boolean } = {
        isEmailEnable: false, // must set email enable first
        isPasswordEnable: false,
    };

    isDataValid: boolean = false;
    isInit: boolean = true;

    private queryStringSub: Subscription = new Subscription();
    detectAutofillSubject: Subject<void> = new Subject<void>();

    constructor(private router: Router,
                private route: ActivatedRoute) {
        this.subscribeDetectAutofill();
    }

    // static bindCodeScriptToHead() {
    //     // Base code script
    //     ExecuteCodeScript.execute(TagManagementScript.BaseScript, TagManagementScript.scriptId, true);
    // }

    ngOnInit() {
        this.detectAutofill();
        //
        this.queryStringSub = this.route.queryParams.subscribe(params => {
            if (!!params['returnUrl']) {
                this.returnUrl = params['returnUrl'];
            }

            if (!!params['email']) {
                if (RegexObject.checkEmailIsValid(params['email'])) {
                    this.login.email = params['email'];
                } else {
                    this.router.navigate(['/login']).then();
                }
            }
        });
    }

    ngOnDestroy(): void {
        CommonFunction.unsubscribe([this.queryStringSub]);
        this.detectAutofillSubject.unsubscribe();
    }

    dataChanged() {
        const email = this.login.email;
        const password = this.login.password;
        // if (!email || !password) {
        //     this.isDataValid = false;
        //     return;
        // }

        this.isDataValid = RegexObject.checkEmailIsValid(String(email)) && password.length >= 6;
    }

    getFreeTrial() {
        this.router.navigate(['sign-up']).then();
    }

    signIn() {
        const login = this.login;
        if (login.isLogging || !this.isDataValid) {
            return;
        }
        this.removeSpaces();
        // login.deviceToken = sessionStorage.getItem(DEVICE_TOKEN);
        // login.platform = sessionStorage.getItem(PLATFORM_NAME) || 'iOS';
        // login.isLogging = true;
        // this.userService.login(login).pipe(
        //     finalize(() => {
        //         login.isLogging = false;
        //     })
        // ).subscribe((res) => {
        //     if (!res || !res.account || !res.user) {
        //         this.accountService.authErrorMessage.emit('Something was wrong. Invalid email or password combination');
        //     } else {
        //         this.doAfterUserLoggedIn(res);
        //     }
        // }, error => {
        //     const messageError = !!error.error && !!error.error.message ? error.error.message : 'Something bad happened; please try again later.';
        //     this.accountService.authErrorMessage.emit(messageError);
        // });
    }

    doAfterUserLoggedIn() {
        // this.store.dispatch(new UserActions.SetAuthResult({
        //     authResult: auth,
        //     setUpNewAuthResultType: UserActions.SetUpNewAuthResultType.Login
        // }));
    }

    forgotPassword() {
        this.router.navigate(['forgot-password']).then();
    }

    checkRemember() {
        this.login.rememberMe = !this.login.rememberMe;
    }

    removeSpaces() {
        if (this.login.email) {
            this.login.email = this.login.email.replace(/\s/g, '');
        }
    }

    /**
     * Helper
     */
    private subscribeDetectAutofill(): void {
        this.detectAutofillSubject.subscribe(() => {
            if (this.autofillDetection.isEmailEnable && this.autofillDetection.isPasswordEnable) {
                this.isDataValid = true;
                this.isInit = false;
            }
            //
            if (this.autofillDetection.isEmailEnable) {
                const emailInput = this.emailTextBox.instance.element().querySelector('input');
                // if detection is done, remove Event Listener
                emailInput.removeEventListener('animationiteration', this.setAutofillEmailEnable, true);
            }
            //
            if (this.autofillDetection.isPasswordEnable) {
                const passwordInput = this.passwordTextBox.instance.element().querySelector('input');
                //
                passwordInput.removeEventListener('animationiteration', this.setAutofillPasswordEnable, true);
            }
        });
    }

    private detectAutofill(): void {
        // use setInterval instead setTimeout
        // b/c setTimeOut is difficult to detect emailTextBox is rendered or not
        const intervalTime = setInterval(() => {
            if (!!this.emailTextBox && !!this.passwordTextBox) {
                const emailInput = this.emailTextBox.instance.element().querySelector('input');
                const passwordInput = this.passwordTextBox.instance.element().querySelector('input');

                if (!!emailInput && !!passwordInput) {
                    clearInterval(intervalTime);
                }
                //
                // use 'animationiteration'. b/c in the risk case, we can't get the detection
                emailInput.addEventListener('animationiteration', this.setAutofillEmailEnable, true);
                passwordInput.addEventListener('animationiteration', this.setAutofillPasswordEnable, true);
            }
        }, 10);
    }

    // We write the separate function, b/c we need to remove 'animationiteration' EventListener later
    //  when the detection's done
    setAutofillEmailEnable = () => {
        if (this.isInit) {
            this.autofillDetection.isEmailEnable = true;
            //
            this.detectAutofillSubject.next();
        }
    };

    setAutofillPasswordEnable = () => {
        // need to check isEmailEnable = true first
        if (this.isInit && this.autofillDetection.isEmailEnable) {
            this.autofillDetection.isPasswordEnable = true;
            //
            this.detectAutofillSubject.next();
        }
    };
}
