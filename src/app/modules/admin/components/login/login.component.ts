import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
//
import {AppNotify, ENDPOINTS, RegexObject} from 'src/app/utilities';
import {AdminService} from '@app/modules/admin/services/admin.service';
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';
import {SignInModel} from '@app/modules/account-setting/models';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('emailTextBox') emailTextBox: DxTextBoxComponent;
    @ViewChild('passwordTextBox') passwordTextBox: DxTextBoxComponent;

    year = new Date().getFullYear();
    login = new SignInModel();
    userId: string;

    isDataValid: boolean = false;

    constructor(private router: Router,
                private adminService: AdminService,
                private adminBaseService: AdminBaseService) {
    }

	ngOnInit() {
		if (this.adminBaseService.isAdminLoggedIn) {
			this.router.navigate(['admin']).then();
		} else {
			// this.adminBaseService.logout();
		}
	}

    dataChanged() {
        const email = this.login.email;
        const password = this.login.password;
        if (!email || !password) {
            this.isDataValid = false;
            return;
        }

        this.isDataValid = RegexObject.checkEmailIsValid(String(email)) && password.length >= 6;
    }

	signIn() {
        const login = this.login;
        if (login.isLogging || !this.isDataValid) {
            return;
        }

		login.isLogging = true;
		this.adminService.login(login).pipe(
			finalize(() => {
				login.isLogging = false;
			})
		).subscribe((res) => {
			if (res) {
                this.adminBaseService.adminAuthResult = res;
                this.router.navigateByUrl(ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN).then();
            } else {
				AppNotify.warning('User or password is invalid.');
			}
		});
	}

	checkRemember() {
		this.login.rememberMe = !this.login.rememberMe;
	}
}
