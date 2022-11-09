import { Injectable } from '@angular/core';
import {BaseService} from "@app/core/services";
import { Observable } from 'rxjs';
import { RegisterChildRequestModel } from '../models/request/register-child.model';

@Injectable({
    providedIn: 'root'
})

export class ChildrenService {
    constructor(private baseService: BaseService) {
    }

    public sendRegisterRequest(data: {
        children: string,
        adopt_request_detail: string,
    }): Observable<any> {
        return this.baseService.post(`activity/adopt_request`, data);
    }

    public registerChild(data: RegisterChildRequestModel): Observable<any> {
        return this.baseService.postFile(`activity/adopt_request_detail`, data);
    }
}
