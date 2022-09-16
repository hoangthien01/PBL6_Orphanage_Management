import {Component, OnDestroy, OnInit, NgZone} from '@angular/core';
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

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
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
    //#endregion
}
