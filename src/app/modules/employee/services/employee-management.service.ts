import { ChildrenModel } from '../models/children.model';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ListChildrenResponseModel } from '../models/children-response.model';
//

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private userURL = 'api/v1/user';

  constructor(private baseService: BaseService) {
  }

  getListEmployees(data: {
    page: number,
    pageSize: number,
    name?: string,
  }): Observable<ListChildrenResponseModel> {
    return this.baseService.get(`${this.userURL}/get_list_employee?page=${data.page}&page_size=${data.pageSize}&name=${data.name}`);
  }

  addChild(child: any) :Observable<ChildrenModel> {
    return this.baseService.postFile(`${this.userURL}`, child);
  }
}
