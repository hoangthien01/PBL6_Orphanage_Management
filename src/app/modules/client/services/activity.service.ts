import { Injectable } from '@angular/core';
//
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ActivityResponseModel } from '../models/activity.model';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    constructor(private baseService: BaseService) {
    }

    getListActivities(data : {
      type: string,
      page: number,
      page_size: number
    }): Observable<ActivityResponseModel> {
      return this.baseService.get(`activity?activity_type=${data.type}&page=${data.page}&page_size=${data.page_size}`);
    }
}
