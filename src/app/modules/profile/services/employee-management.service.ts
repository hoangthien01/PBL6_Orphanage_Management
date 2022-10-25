import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services';
import { EmployeeModel } from '@app/modules/employee/models';
import { Observable } from 'rxjs';
//

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private userURL = 'api/v1/user';

  constructor(private baseService: BaseService) {
  }

  getProfile(id: string): Observable<EmployeeModel> {
    return this.baseService.get(`user/${id}`);
  }
}
