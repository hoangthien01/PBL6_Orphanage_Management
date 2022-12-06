import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserSelectors } from '@app/core/store';
import { UserLoggedInModel } from '@app/core/store/models';
import { CommentService } from '@app/modules/client/services/comment.service';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-comment',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit, OnDestroy {
    @Select(UserSelectors.userLogged) userLogged$: Observable<UserLoggedInModel>;
    @Select(UserSelectors.userAvatar) userAvatar$: Observable<string>;
    //
    @Input() activityId: string;
    @Input() parentId: string = '';
    //
    @Output() onPostComment: EventEmitter<void> = new EventEmitter<void>();
    //
    currentUser: UserLoggedInModel;
    message: string;
    isLoading: boolean = false;
    //
    subscription: Subscription = new Subscription();
    //
    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private commentService: CommentService,
    ) {
        //
    }

    ngOnInit(): void {
        this.subscription.add(this.userLogged$.subscribe((res) => {
            this.currentUser = res;
            this.cdr.detectChanges();
        }));
    }

    ngOnDestroy(): void {
    }

    onSendComment() {
        this.isLoading = true;
        //
        const data = {
            content: this.message,
            activity: this.activityId,
            parent: this.parentId,
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
                this.onPostComment.emit();
            }
        )
    }
}
