import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
//
import { ListDonerResponseModel } from '../models/doner.model';
//

@Injectable({
  providedIn: 'root'
})

export class DonerService {
  constructor(private baseService: BaseService) {
  }

  getListEmployees(): Observable<ListDonerResponseModel> {
    return this.baseService.get(`statistic/donate`);
  }

  getStatisticChartData(params: {
    start_date: string,
    end_date: string
  }) {
    return this.baseService.get(`statistic/donate/get_donate_statistics?start_date=${params.start_date}&end_date=${params.end_date}`);
  }
}
