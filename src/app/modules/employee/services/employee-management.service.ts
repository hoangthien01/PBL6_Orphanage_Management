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

  addEmployee(employee: any) :Observable<EmployeeModel> {
    return this.baseService.post(`user/create_employee`, employee);
  }

  getEmployee(id: string): Observable<EmployeeModel> {
    return this.baseService.get(`user/${id}`);
  }

  updateEmployee(employee: EmployeeModel) :Observable<EmployeeModel> {
    return this.baseService.putFile(`user/${employee.id}`, employee);
  }

  removeAvatar(id: string): Observable<EmployeeModel> {
    return this.baseService.delete(`user/${id}/remove_avatar`);
  }
}
