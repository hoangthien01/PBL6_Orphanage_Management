import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
//
// import { ENDPOINTS } from '@app/utilities';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  constructor(private _router: Router,
    private _store: Store) {
  }

  logout() {
    // this._store.dispatch(new UserActions.Logout({
    //     destroyAllIntegrations: true,
    //     navigateToUrl: ENDPOINTS.LOGIN
    // }));
  }

  goToHomePage() {
    this._router.navigate(['/conversations']).then();
  }
}
