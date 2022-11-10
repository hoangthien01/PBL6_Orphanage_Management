import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {DonateService} from "@app/modules/client/services/donate.service";
import {Select} from "@ngxs/store";
import {UserSelectors} from "@app/core/store";
import {Observable, Subscription} from "rxjs";
import {UserLoggedInModel} from "@app/core/store/models";
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnDestroy {
    @Select(UserSelectors.userLogged) userLogged$: Observable<UserLoggedInModel>;
    //
    currentUser: UserLoggedInModel = new UserLoggedInModel();
    paymentHandler: any = null;
    message: string;
    money: number = 10000;
    //
    isDonated: boolean = false;
    //
    private _subscription : Subscription = new Subscription();
    //
    constructor(private _donateService: DonateService,
                private router: Router,
                private _cdr: ChangeDetectorRef) {
        this.makePayment = this.makePayment.bind(this);
    }

    ngOnInit() {
        this._subscription.add(this.userLogged$.subscribe((res) => {
          this.currentUser = res;
          this._cdr.detectChanges();
        }));
        this.invokeStripe();
        console.log(history.state)
    }

    ngOnDestroy(): void {
    }

    makePayment(amount: number) {
        const paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51M066MIV4V5C5hgG2RRmkFGiwNiCTyvf1OV9zVDYvhbPxlAuAKs7K8QCtK6qbGN4HYuJsxopcCGwmCUrJ848pvNy00Bco1q7uF',
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            this.isDonated = true;
            const data = {
                activity: history.state.activityId,
                amount: this.money / 1000,
                email: this.currentUser.email,
                note: this.message,
            }
            this._donateService.donate(data).subscribe(
                res => {
                  console.log(res);
              }
            )
            // alert('Stripe token generated!');
          },
        });

        paymentHandler.open({
          name: 'Positronx',
          description: '3 widgets',
          amount: amount * 100,
        });
    }

    invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51M066MIV4V5C5hgG2RRmkFGiwNiCTyvf1OV9zVDYvhbPxlAuAKs7K8QCtK6qbGN4HYuJsxopcCGwmCUrJ848pvNy00Bco1q7uF',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            // alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
    }

    goHomePage() {
        this.router.navigate(['home']).then();
    }
}
