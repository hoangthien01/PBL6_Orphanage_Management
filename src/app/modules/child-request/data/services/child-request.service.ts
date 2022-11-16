import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { BaseService } from '@app/core/services';
import { ChildRequestsResponseModel } from '../../models/child-request.model';

@Injectable({
    providedIn: 'root'
})
export class ChildRequestService {
    constructor(private httpClient: HttpClient, private apiService: BaseService) { }

    getActiveChildRequests(param: {
        page: number,
        page_size: number
    }): Observable<ChildRequestsResponseModel> {
        return this.apiService.get<ChildRequestsResponseModel>(`activity/adopt_request?page=${param.page}&page_size=${param.page_size}&status=Approve`);
    }

    getPendingChildRequests(param: {
        page: number,
        page_size: number
    }): Observable<ChildRequestsResponseModel> {
        return this.apiService.get<ChildRequestsResponseModel>(`activity/adopt_request?page=${param.page}&page_size=${param.page_size}&status=Pending`);
    }

    getInactiveChildRequests(param: {
        page: number,
        page_size: number
    }): Observable<ChildRequestsResponseModel> {
        return this.apiService.get<ChildRequestsResponseModel>(`activity/adopt_request?page=${param.page}&page_size=${param.page_size}`);
    }

    getTabsCounting(): Observable<any> {
        return this.apiService.get<any>(`organizations/status-count`);
    }

    getRequestDetail(id: string): Observable<any> {
        return this.apiService.get(`activity/adopt_request_detail/${id}`);
    }

    approveRequest(id: String) {
        return this.apiService.post(`activity/adopt_request/${id}/do_action?action=Approve`, {});
    }

    rejectRequest(id: String) {
        return this.apiService.post(`activity/adopt_request/${id}/do_action?action=Reject`, {});
    }

    cancelInvitation(id: String) {
        return this.apiService.post(`activity/adopt_request/${id}/do_action?action=Cancel`, {});
    }

    //   addSubOrganizationWithEmail(organization: AdditionalLocationModel) {
    //     return this.apiService.post('organizations/association/invite', organization);
    //   }

    //   addSubOrganization(organization: AdditionalLocationModel) {
    //     return this.apiService.post('organizations', organization);
    //   }
}
