import { Component, OnDestroy } from '@angular/core';
// import { CommonFunction } from 'src/app/utilities';
import { Subscription } from 'rxjs';
//
// import { AccountService } from '@app/modules/account-setting/services/account.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  year: any;
  authErrorMessageSub: Subscription = new Subscription();
  errorMessage = '';

  constructor() {
    this.year = new Date().getFullYear();

    // this.authErrorMessageSub = this.accountService.authErrorMessage.subscribe((message) => {
    //     this.errorMessage = message;

    setTimeout(() => {
        this.errorMessage = null;
    }, 3000);
    // });
  }

  goToPrivacyPolicy() {
    // CommonFunction.goToPrivacyPolicy();
  }

  goToTermOfService() {
    // CommonFunction.goToTermOfService();
  }

  ngOnDestroy(): void {
    // CommonFunction.unsubscribe([this.authErrorMessageSub]);
  }
}
