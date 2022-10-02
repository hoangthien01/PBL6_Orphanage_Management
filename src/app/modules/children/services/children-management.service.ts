import { ChildrenModel } from './../models/children.model';
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
    status?: string,
  }): Observable<ListChildrenResponseModel> {
    return this.baseService.get(`${this.userURL}?page=${data.page}&page_size=${data.pageSize}&name=${data.name}&age=${data.age}&gender=${data.gender}&status=${data.status}`);
  }

  addChild(child: any) :Observable<ChildrenModel> {
    console.log('child', child);
    const form = new FormData();
    form.append('name', child.name);
    form.append('age', child.age.toString());
    form.append('gender', child.gender.toString());
    form.append('personal_picture', child.personal_picture);
    return this.baseService.post(`${this.userURL}`, form);
  }
}
