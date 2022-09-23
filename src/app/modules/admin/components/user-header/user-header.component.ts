import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
//
import {AdminBaseService} from '@app/modules/admin/services/admin-base.service';

@Component({
	selector: 'app-user-header',
	templateUrl: './user-header.component.html',
	styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
	isShowMenu: boolean = false;
	currentAdmin: any;

	constructor(private router: Router,
				private adminBaseService: AdminBaseService) {
	}

	ngOnInit(): void {
		this.currentAdmin = this.adminBaseService.adminAuthResult.adminUser;
	}

	logout() {
		this.adminBaseService.adminAuthResult = null;
		this.router.navigate(['admin/login']).then();
	}
}
