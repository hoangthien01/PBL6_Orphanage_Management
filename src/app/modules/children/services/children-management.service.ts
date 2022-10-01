import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ListChildrenResponseModel } from '../models/children-response.model';
//

@Injectable({
  providedIn: 'root'
})

export class ChildrenService {
  private userURL = 'api/v1/children';

  constructor(private baseService: BaseService) {
  }

  getListChildrens(data: {
    page: number,
    pageSize: number,
    name?: string,
    age?: number,
    gender?: number,
    status?: number,
  }): Observable<ListChildrenResponseModel> {
    console.log('data', data);

    return this.baseService.get(`${this.userURL}?
      page=${data.page}
      &page_size=${data.pageSize}
      &name=${data.name}
      &age=${data.age}
      &gender=${data.gender}
      &status=${data.status}`);
  }
}
