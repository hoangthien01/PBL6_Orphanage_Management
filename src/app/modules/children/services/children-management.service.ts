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
    return this.baseService.get(`children?page=${data.page}&page_size=${data.pageSize}&name=${data.name}&age=${data.age}&gender=${data.gender}&status=${data.status}`);
  }

  getChild(id: string): Observable<ChildrenModel> {
    return this.baseService.get(`children/${id}`);
  }

  updateChild(child: ChildrenModel): Observable<ChildrenModel> {
    return this.baseService.putFile(`children/${child.id}`, child);
  }

  addChild(child: any) :Observable<ChildrenModel> {
    return this.baseService.postFile(`children`, child);
  }

  removeAvatar(id: string): Observable<ChildrenModel> {
    return this.baseService.delete(`children/${id}/remove_photo`);
  }

  deleteChild(children_ids: string[]): Observable<any> {
    const data = {
        children_ids: children_ids
    }
    return this.baseService.post(`children/destroy_multi`, data);
  }
}
