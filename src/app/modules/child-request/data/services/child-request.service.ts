import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { BaseService } from '@app/core/services';
import { ChildRequestsResponseModel } from '../../models/child-request.model';

@Injectable({
    providedIn:'root'
})
export class ChildRequestService {
  constructor(private httpClient: HttpClient, private apiService: BaseService) {}

  getActiveChildRequests(param: {
    page: number,
    page_size: number
  }): Observable<ChildRequestsResponseModel> {
    return this.apiService.get<ChildRequestsResponseModel>(`activity/adopt_request?page=${param.page}&page_size=${param.page_size}&status=`);
  }

  getPendingChildRequests(param: {
    page: number,
    page_size: number
  }): Observable<ChildRequestsResponseModel> {
    return this.apiService.get<ChildRequestsResponseModel>(`activity/adopt_request?page=${param.page}&page_size=${param.page_size}&status=Pending`);
  }

  getLocationCounting(): Observable<any> {
    return this.apiService.get<any>(`organizations/status-count`);
  }

  getOrganizationById(id: string): Observable<any> {
    return this.apiService.get(`organizations/${id}`);
  }

  updateOrganization(id: string, organization: any): Observable<any> {
    return this.apiService.post<any>(`organizations/${id}`, organization);
  }

  deleteOrganization(id: String) {
    return this.apiService.delete(`organizations/subsidiary-location/${id}`);
  }

  approveRequest(id: String) {
    return this.apiService.post(`organizations/request/${id}/approve`, {});
  }

  rejectRequest(id: String) {
    return this.apiService.post(`organizations/request/${id}/reject`, {});
  }

  cancelInvitation(id: String) {
    return this.apiService.post(`organizations/association/${id}/cancel-invite`, {});
  }

//   addSubOrganizationWithEmail(organization: AdditionalLocationModel) {
//     return this.apiService.post('organizations/association/invite', organization);
//   }

//   addSubOrganization(organization: AdditionalLocationModel) {
//     return this.apiService.post('organizations', organization);
//   }
}
