import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppNotify } from '../../../utilities';
import { ADMIN_TOKEN_STORE_NAME, LOGGED_ADMIN_USER_STORE_NAME } from '@app/shared/app.constants';
import { AdminAuthResultModel } from '@app/modules/admin/models/admin-auth-result-model';

@Injectable({
  providedIn: 'root'
})
export class AdminBaseService {
	private baseURL = environment.baseUrl;

	constructor(private router: Router, private httpClient: HttpClient) {
	}

	get headers(): HttpHeaders {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(ADMIN_TOKEN_STORE_NAME),
		});
	}

	get options() {
		return { headers: this.headers };
	}

	private _adminAuthResult: AdminAuthResultModel;
	get adminAuthResult(): AdminAuthResultModel {
		if (this._adminAuthResult) {
			return this._adminAuthResult;
		}

		const adminUserJSON = localStorage.getItem(LOGGED_ADMIN_USER_STORE_NAME);
		if (!adminUserJSON) {
			return null;
		}

		return this._adminAuthResult = JSON.parse(decodeURIComponent(atob(adminUserJSON)));
	}

	set adminAuthResult(value: AdminAuthResultModel) {
		this._adminAuthResult = value;
		// If set user = null then that means log-out
		if (value == null) {
			this.removeAdminLoggedUser();
		}

		this.storeLoggedAdminUser();
	}

	get isAdminLoggedIn(): boolean {
		return localStorage.getItem(ADMIN_TOKEN_STORE_NAME) != null;
	}

	public storeLoggedAdminUser() {
		const adminAuthResult = this.adminAuthResult;
		this.removeAdminLoggedUser();
		if (!adminAuthResult) {
			return;
		}
		localStorage.setItem(ADMIN_TOKEN_STORE_NAME, adminAuthResult.token);
		localStorage.setItem(LOGGED_ADMIN_USER_STORE_NAME, btoa(encodeURIComponent(JSON.stringify(adminAuthResult))));
	}

	get<T>(url: string): Observable<T> {
		return this.httpClient
			.get<T>(`${this.baseURL}/${url}`, this.options)
			.pipe(catchError((error) => this.handleError(error)));
	}

	post<T>(url: string, data: any): Observable<T> {
		return this.httpClient
			.post<T>(`${this.baseURL}/${url}`, data, this.options)
			.pipe(catchError(this.handleError));
	}

	put<T>(url: string, data: any): Observable<T> {
		return this.httpClient
			.put<T>(`${this.baseURL}/${url}`, data, this.options)
			.pipe(catchError(this.handleError));
	}

	delete<T>(url: string): Observable<T> {
		return this.httpClient
			.delete<T>(`${this.baseURL}/${url}`, this.options)
			.pipe(catchError(this.handleError));
	}

	private removeAdminLoggedUser() {
		localStorage.removeItem(ADMIN_TOKEN_STORE_NAME);
		localStorage.removeItem(LOGGED_ADMIN_USER_STORE_NAME);
	}

	private handleError(error: HttpErrorResponse) {
		if (error.status === 401) {
			// Clear cache
			// Remove old access token if have
			this.removeAdminLoggedUser();
			//
			// Navigate to login page
			window.location.href = window.location.origin + '/login';
		}

		if (error.status === 403) {
			//
			// Navigate to forbidden page
			window.location.href = window.location.origin + '/forbidden';
		}

		let messageError = '';
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}

		if (!!error.error && !!error.error.message) {
			messageError = error.error.message;
		} else {
			messageError = 'Something bad happened; please try again later.';
		}

		AppNotify.error(messageError);


		// return an observable with a user-facing error message
		return throwError(messageError);
	}
}
