import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AdminAuthResultModel} from '@app/modules/admin/models/admin-auth-result-model';
import {AdminBaseService} from './admin-base.service';
import {SignInModel} from '@app/modules/account-setting/models';

@Injectable()
export class AdminService {
	private adminUserURL = 'api/admin';

	constructor(private adminBaseService: AdminBaseService) {
	}

	login(login: SignInModel): Observable<AdminAuthResultModel> {
		return this.adminBaseService.post(`${this.adminUserURL}/auth`, login);
	}

	getAccounts(params): Observable<any> {
		const query = [
			`skip=${params.Skip}`,
			`take=${params.Take}`,
			`SortColumn=${params.ColumnName}`,
			`SortType=${params.SortOrder}`,
			`Keyword=${params.Keyword}`,
		];

		const url = this.adminUserURL + '/accounts' + '?' + query.join('&');
		return this.adminBaseService.get(url);
	}

	deleteAccounts(accountIds: string[]): Observable<boolean> {
        return this.adminBaseService.post(`${this.adminUserURL}/accounts`, accountIds);
	}
}
