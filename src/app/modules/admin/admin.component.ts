import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
//
import {ENDPOINTS} from 'src/app/utilities';
import {SideBarItemModel} from '@app/shared/models';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    menu: SideBarItemModel[] = [
        new SideBarItemModel({
            value: 'Subscription Plan',
            key: ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN,
            routerLink: ENDPOINTS.ADMIN_SUBSCRIPTION_PLAN,
        }),
        new SideBarItemModel({
            value: 'Subscription Assignment',
            key: ENDPOINTS.ADMIN_SUBSCRIPTION_ASSIGNMENT,
            routerLink: ENDPOINTS.ADMIN_SUBSCRIPTION_ASSIGNMENT,
        })
    ];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigate(router: string) {
        this.router.navigate([`admin/${router}`]).then();
	}
}

