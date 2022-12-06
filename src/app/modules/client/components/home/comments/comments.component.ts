import { id } from 'date-fns/locale';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommentModel } from '@app/modules/client/models/comment.model';
import { CommentService } from '@app/modules/client/services/comment.service';
import { finalize } from 'rxjs/operators';
//
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit, OnDestroy {
    @Input() activityId: string;
    //
    comments: CommentModel[];
    commentsList = new Object();
    selectedCommentId: string;
    message: string = '';
    isLoading: boolean = false;
    //
    constructor(
        private commentService: CommentService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getComments();
    }

    ngOnDestroy(): void {
    }

    getComments() {
        this.commentService.getComments(this.activityId)
        .pipe(
            finalize(() => {
                this.cdr.detectChanges();
            })
        )
        .subscribe(
            res => {
                res.forEach(element => {
                    if(!element.parent) {
                        this.commentsList[element.id] = [];
                    }
                });
                res.forEach(element => {
                    if (element.parent) {
                        this.commentsList[element.parent].push(element)
                        this.commentsList[element.parent] = this.commentsList[element.parent].sort(this.dateComparison);
                    }
                });
                this.comments = res;
                this.comments = this.comments.sort(this.dateComparison);
            }
        )
    }

    dateComparison(a, b): number {
        const date1 = new Date(a.updated_at).valueOf()
        const date2 = new Date(b.updated_at).valueOf()

        return date1 - date2;
    }

    openReplyBox(commentId: string) {
        this.selectedCommentId = commentId;
    }

    onSendComment() {
        this.isLoading = true;
        //
        const data = {
            content: this.message,
            activity: this.activityId,
            parent: this.selectedCommentId,
        }
        this.commentService.postComment(data)
        .pipe(
            finalize(() => {
                this.message = '';
                this.isLoading = false;
                this.cdr.detectChanges();
            })
        )
        .subscribe(
            res => {
                this.getComments();
            }
        )
    }
}
