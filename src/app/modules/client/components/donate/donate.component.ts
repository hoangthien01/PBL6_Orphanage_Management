import { Component, OnDestroy } from '@angular/core';
import {DonateService} from "@app/modules/client/services/donate.service";

@Component({
  selector: 'app-client-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnDestroy {
  paymentHandler: any = null;
  money: number = 10000;
  //
  constructor(private _donateService: DonateService) {
      this.makePayment = this.makePayment.bind(this);
  }

  ngOnInit() {
    this.invokeStripe();
  }

  ngOnDestroy(): void {
  }

  payment() {
      // if (this.makePayment()) {
      //
      // };
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M066MIV4V5C5hgG2RRmkFGiwNiCTyvf1OV9zVDYvhbPxlAuAKs7K8QCtK6qbGN4HYuJsxopcCGwmCUrJ848pvNy00Bco1q7uF',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        if (stripeToken) return true;
        const data = {
            activity: '11111',
            amount: this.money
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
}
