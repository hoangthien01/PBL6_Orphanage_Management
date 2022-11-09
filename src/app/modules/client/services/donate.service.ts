import { Injectable } from '@angular/core';
import {BaseService} from "@app/core/services";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DonateService {
    constructor(private baseService: BaseService) {
    }

    public donate(data: {
        activity: string,
        amount: number,
        note: string,
        email: string,
    }): Observable<any> {
        return this.baseService.post(`statistic/donate`, data);
    }
}
