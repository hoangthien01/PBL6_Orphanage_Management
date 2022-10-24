import { ActivityModel } from './../../../models/activity.model';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/client/services/activity.service';
import { Router } from '@angular/router';
import { ActivityTypeModel } from '@app/modules/client/models/activity-type.model';
import * as ActivitiesActions from '../../../../../core/store/activities/activities.actions';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActivitiesSelectors } from '@app/core/store/activities/activities.selectors';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {
  activites$: Observable<ActivityModel[]> = this.store.select<ActivityModel[]>(ActivitiesSelectors.activities);
  //
  activites: ActivityModel[];
  activityTypes: ActivityTypeModel[];
  //
  page: number = 1;
  page_size: number = 6;
  type: string = 'all';
  //
  isShowRegisterPopup: boolean = false;
  //
  private _subscriptions: Subscription = new Subscription();;
  //
  constructor(private activityService: ActivityService,
              private router: Router,
              private store: Store) {
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
        this.activites = activities;
    }));
}

  getListActivities() {
    const data = {
      page: this.page,
      page_size: this.page_size,
      type: this.type
    }

    this.activityService.getListActivities(data).subscribe(
      res => {
        this.activites = res.results;
        this.store.dispatch(new ActivitiesActions.setActivities(res.results));
      })
  }

  getActivityTypes() {
    this.activityService.getActivityTypes().subscribe(
      res => {
        this.activityTypes = res;
      }
    )
  }

  visibleRegisterPopup() {
    this.isShowRegisterPopup =!this.isShowRegisterPopup;
  }

  hideRegisterPopup() {
    this.isShowRegisterPopup = false;
  }

  sendInfo() {
    this.isShowRegisterPopup = false;
  }

  goActivityDetail(id: string) {
		this.router.navigate(['activities', id ]).then();
  }
}
