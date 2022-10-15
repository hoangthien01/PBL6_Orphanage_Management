import {Component, OnDestroy, OnInit, ViewChild, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {ReplaySubject, Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
//

export enum TAB_ENUM {
    Contacts = 1,
    Conversations = 2,
    Campaigns = 3
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    tabs = TAB_ENUM;
    selectedTab: TAB_ENUM;

    isMadePhoneCall: boolean = false;
    isAccountLocked: boolean = false;
    isAccountLockedDueToRequiringRegisterA2P10DLC: boolean = false;

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    private subscription: Subscription = new Subscription();

    constructor(private _store: Store,
                private ngZone: NgZone,
                private router: Router) {
    }

    ngOnInit() {
        this.setSelectedTab(this.router.url);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.subscription.unsubscribe();
    }

    private setSelectedTab(url: string): void {
        if (!url) {
            return;
        }
        //
        switch (true) {
            case url.includes('/contacts'):
                this.selectedTab = this.tabs.Contacts;
                break;
            case url.includes('/conversations'):
                this.selectedTab = this.tabs.Conversations;
                break;
            case url.includes('/campaigns'):
                this.selectedTab = this.tabs.Campaigns;
                break;
            default:
                this.selectedTab = null;
                break;
        }
    }

    // We need to apply menu-selected css class immediately
    // If using routerLink from html file, the css class does not apply immediately so UI will be delayed, thus UX is not smooth
    onTabClicked(tab: TAB_ENUM) {
        setTimeout(() => {
            switch (tab) {
                case this.tabs.Contacts:
                    this.router.navigate(['/contacts']).then();
                    break;
                case this.tabs.Conversations:
                    this.router.navigate(['/conversations']).then();
                    break;
                case this.tabs.Campaigns:
                    this.router.navigate(['/campaigns']).then();
                    break;
            }
        });
    }
}
