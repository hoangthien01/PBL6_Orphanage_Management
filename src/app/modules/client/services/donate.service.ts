import { Injectable } from '@angular/core';
import {BaseService} from "@app/core/services";

@Injectable({
    providedIn: 'root'
})

export class DonateService {
    constructor(private baseService: BaseService) {
    }

    public donate(data: {
        activity: number,
        amount: number
    }): void {
        this.baseService.post(`/statistic/donate`, data);
    }
}
