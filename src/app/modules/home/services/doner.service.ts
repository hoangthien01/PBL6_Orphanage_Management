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
}
