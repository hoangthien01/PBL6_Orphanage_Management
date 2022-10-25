import { EmployeeModel } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { Observable } from 'rxjs';
import { ListEmployeeResponseModel } from '../models/employee-response.model';
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
  }): Observable<ListEmployeeResponseModel> {
    return this.baseService.get(`user/get_list_employee?page=${data.page}&page_size=${data.pageSize}&name=${data.name}`);
  }

  getEmployee(id: string): Observable<EmployeeModel> {
    return this.baseService.get(`user/get_employee?id=${id}`);
  }

  addEmployee(employee: any) :Observable<EmployeeModel> {
    return this.baseService.postFile(`user`, employee);
  }
}
