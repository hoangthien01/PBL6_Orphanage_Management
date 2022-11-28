import { finalize } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivityService } from '@app/modules/activity/services/activity.service';
import { ActivityModel } from '@app/modules/activity/models/activity.model';
import { CommentsComponent } from '../comments/comments.component';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailComponent implements OnDestroy {
    @ViewChild('comments') comments: CommentsComponent;
    //
    activity: ActivityModel;
    isLoading: boolean = false;
    //
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private activityService: ActivityService) {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        const id = this.route.snapshot.paramMap.get('id')!;
        this.isLoading = true;
        this.activityService.getActivity(id)
        .pipe(
            finalize(() => {
                this.cdr.detectChanges();
            })
        ).subscribe((res) => {
            this.activity = res;
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
    }

    onPostComment(e: any) {
        this.comments.message = '';
        this.comments.getComments();
        // this.cdr.detectChanges();
    }
}
