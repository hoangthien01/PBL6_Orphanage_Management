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

  getListChildrens(page: number = 1, pageSize: number = 10): Observable<ListChildrenResponseModel> {
    return this.baseService.get(`${this.userURL}?page=${page}&page_size=${pageSize}`);
  }
}
