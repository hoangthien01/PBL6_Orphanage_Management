import { Injectable } from '@angular/core';
//
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ActivityTypeModel } from '../models/activity-type.model';
import { ActivityModel, ActivityResponseModel } from '../models/activity.model';

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

    getActivity(id: string): Observable<ActivityModel> {
      return this.baseService.get(`activity/${id}`);
    }

    getActivityTypes(): Observable<ActivityTypeModel[]> {
      return this.baseService.get(`activity/activity_type?group=9a6fbc15-1cda-4d93-8785-96fe1515793d`);
    }
}
