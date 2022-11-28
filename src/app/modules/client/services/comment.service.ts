import { Injectable } from '@angular/core';
import {BaseService} from "@app/core/services";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    constructor(private baseService: BaseService) {
    }

    public postComment(data: {
        activity: string,
        content: string,
        parent?: string,
    }): Observable<any> {
        return this.baseService.post(`activity/comment`, data);
    }

    public getComments(activityId: string): Observable<any> {
        return this.baseService.get(`activity/comment?activity=${activityId}`);
    }
}
