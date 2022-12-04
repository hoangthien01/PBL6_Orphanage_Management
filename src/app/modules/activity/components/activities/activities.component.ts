import { finalize } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivityService } from '@app/modules/activity/services/activity.service';
import { Router } from '@angular/router';
import { ActivityTypeModel } from '@app/modules/activity/models/activity-type.model';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActivitiesSelectors } from '@app/core/store/activities/activities.selectors';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { SendInfoModel } from '@app/modules/client/models/send-info.model';
import { AppNotify } from '@app/utilities';
import { ActivityModel } from '../../models/activity.model';
import * as ActivitiesActions from './../../../../core/store/activities/activities.actions';
import { id } from 'date-fns/locale';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesComponent implements OnDestroy {
    activites$: Observable<ActivityModel[]> = this.store.select<ActivityModel[]>(ActivitiesSelectors.activities);
    //
    @Input() isDataValid: boolean = false;
    //
    @Output() onShowCreatePage: EventEmitter<boolean> = new EventEmitter<boolean>();
    //
    activities: ActivityModel[];
    activityTypes: ActivityTypeModel[];
    //
    loadingArr = [1, 2, 3, 4, 5, 6, 7, 8];
    page: number = 1;
    page_size: number = 6;
    type: string = 'all';
    sendData: SendInfoModel = new SendInfoModel();
    //
    isShowRegisterPopup: boolean = false;
    isRegistering: boolean = false;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    //
    private _subscriptions: Subscription = new Subscription();;
    //
    constructor(private activityService: ActivityService,
        private userService: UserService,
        private router: Router,
        private store: Store,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.getActivityTypes();
        this.getListActivities();
        this._subscribeActivities();
    }

    ngOnDestroy(): void {
    }

    private _subscribeActivities() {
        this._subscriptions.add(this.activites$.subscribe((activities: ActivityModel[]) => {
            this.activities = activities;
        }));
    }

    toggleEditActivity() {
        this.isEditMode = !this.isEditMode;
    }

    getListActivities() {
        const data = {
            page: this.page,
            page_size: this.page_size,
            type: this.type
        }
        this.isLoading = true
        this.activityService.getListActivities(data)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                })
            ).subscribe(
                res => {
                    this.activities = res.results;
                    this.store.dispatch(new ActivitiesActions.setActivities(res.results));
                })
    }

    loadMore() {
        this.page_size = this.page_size + 4;
        this.getListActivities();
    }

    getActivityTypes() {
        this.activityService.getActivityTypes().subscribe(
            res => {
                this.activityTypes = res;
            }
        )
    }

    openCreatePage() {
        this.onShowCreatePage.emit();
    }

    goActivityDetail(id: string) {
        this.router.navigate(['activities', id]).then();
    }
}
