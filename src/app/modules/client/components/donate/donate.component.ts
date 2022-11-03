import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-client-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnDestroy {
  paymentHandler: any = null;
  //
  constructor() {}

  ngOnInit() {
    this.invokeStripe();
  }

  ngOnDestroy(): void {
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M066MIV4V5C5hgG2RRmkFGiwNiCTyvf1OV9zVDYvhbPxlAuAKs7K8QCtK6qbGN4HYuJsxopcCGwmCUrJ848pvNy00Bco1q7uF',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
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
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
