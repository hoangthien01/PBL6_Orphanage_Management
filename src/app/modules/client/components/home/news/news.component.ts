import { ActivityModel } from './../../../models/activity.model';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/client/services/activity.service';
import { Router } from '@angular/router';
import { ActivityTypeModel } from '@app/modules/client/models/activity-type.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {
  activites: ActivityModel[];
  activityTypes: ActivityTypeModel[];
  //
  page: number = 1;
  page_size: number = 6;
  type: string = 'all';
  //
  isShowRegisterPopup: boolean = false;
  //
  constructor(private activityService: ActivityService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getActivityTypes();
    this.getListActivities();
  }

  ngOnDestroy(): void {
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
      })
  }

  getActivityTypes() {
    this.activityService.getActivityTypes().subscribe(
      res => {
        console.log('result', res);
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
