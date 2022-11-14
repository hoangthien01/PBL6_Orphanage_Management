import { UserService } from './../../../../account-setting/services/user.service';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserSelectors } from '@app/core/store';
import { AppNotify } from '@app/utilities';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-client-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  isRegisteredInfo$: Observable<boolean> = this.store.select<boolean>(UserSelectors.isUserRegisteredInfo);
  @Output() onShowRegisterPopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  //
  isRegisteredInfo: boolean = false;
  //
  private _subscriptions = new Subscription();
  //
  constructor(private router: Router,
              private store: Store,
              private userService: UserService) {
  }

  ngOnInit() {
    this._subscriptions.add(this.isRegisteredInfo$.subscribe((isRegisteredInfo: boolean) => {
        this.isRegisteredInfo = isRegisteredInfo;
    }));
  }

  ngOnDestroy(): void {
  }

  goDonatePage() {
    this.router.navigateByUrl('/donate', {state: {activityId: ''}}).then();
  }

  sendInfo() {
    this.userService.sendInfo(null)
    .subscribe((res) => {
        this.isRegisteredInfo = true;
        AppNotify.success('Đăng kí nhận thông tin thành công.');
    })
  }
}
