import { finalize } from 'rxjs/operators';
import { ActivityModel } from '../../../../activity/models/activity.model';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/activity/services/activity.service';
import { Router } from '@angular/router';
import { ActivityTypeModel } from '@app/modules/activity/models/activity-type.model';
import * as ActivitiesActions from '../../../../../core/store/activities/activities.actions';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActivitiesSelectors } from '@app/core/store/activities/activities.selectors';
import { UserService } from '@app/modules/account-setting/services/user.service';
import { SendInfoModel } from '@app/modules/client/models/send-info.model';
import { AppNotify } from '@app/utilities';
import { UserSelectors, UserStorage } from "@app/core/store";
import { SetAccountIsRegisterd } from '@app/core/store/user/user.actions';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {
    activites$: Observable<ActivityModel[]> = this.store.select<ActivityModel[]>(ActivitiesSelectors.activities);
    isRegisteredInfo$: Observable<boolean> = this.store.select<boolean>(UserSelectors.isUserRegisteredInfo);
    //
    activities: ActivityModel[];
    activityTypes: ActivityTypeModel[];
    //
    loadingArr = [1, 2, 3];
    page: number = 1;
    page_size: number = 5;
    totalCount: number = 0;
    type: string = 'all';
    sendData: SendInfoModel = new SendInfoModel();
    //
    isShowRegisterPopup: boolean = false;
    isRegistering: boolean = false;
    isLoading: boolean = false;
    isRegisteredInfo: boolean = false;
    isLoadingMore: boolean = false;
    //
    private _subscriptions: Subscription = new Subscription();
    //
    constructor(private activityService: ActivityService,
        private userService: UserService,
        private router: Router,
        private store: Store) {
    }

    ngOnInit(): void {
        this.getActivityTypes();
        this.isLoading = true
        this.getListActivities();
        this._subscribeActivities();
    }

    ngOnDestroy(): void {
    }

    private _subscribeActivities() {
        this._subscriptions.add(this.activites$.subscribe((activities: ActivityModel[]) => {
            this.activities = activities;
        }));

        this._subscriptions.add(this.isRegisteredInfo$.subscribe((isRegisteredInfo: boolean) => {
            this.isRegisteredInfo = isRegisteredInfo;
        }));
    }

    getListActivities() {
        const data = {
            page: this.page,
            page_size: this.page_size,
            type: this.type
        }
        this.activityService.getListActivities(data)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                    this.isLoadingMore = false;
                })
            ).subscribe(
                res => {
                    this.activities = res.results;
                    this.totalCount = res.count;
                    this.store.dispatch(new ActivitiesActions.setActivities(res.results));
                })
    }

    loadMore() {
        this.page_size = this.page_size + 3;
        this.isLoadingMore = true;
        this.getListActivities();
    }

    getActivityTypes() {
        this.activityService.getActivityTypes().subscribe(
            res => {
                this.activityTypes = res;
            }
        )
    }

    visibleRegisterPopup() {
        if (!!UserStorage.isLoggedIn()) {
            this.userService.sendInfo(this.sendData)
            .subscribe((res) => {
                this.isRegisteredInfo = true;
                this.store.dispatch(new SetAccountIsRegisterd(true));
                AppNotify.success('Đăng kí nhận thông tin thành công.');
            })
            return;
        }
        this.isShowRegisterPopup = !this.isShowRegisterPopup;
    }

    hideRegisterPopup() {
        this.isShowRegisterPopup = false;
    }

    sendInfo() {
        this.isRegistering = true;
        this.userService.sendInfo(this.sendData)
            .pipe(
                finalize(() => {
                    this.isRegistering = false;
                    this.isShowRegisterPopup = false;
                })
            )
            .subscribe((res) => {
                AppNotify.success('Đăng kí nhận thông tin thành công.');
            })
    }

    goActivityDetail(id: string) {
        this.router.navigate(['activities', id]).then();
    }

    goToDonate(activityId?: string) {
        this.router.navigateByUrl('/donate', { state: { activityId: activityId } }).then();
    }
}
