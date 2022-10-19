import { ActivityModel } from './../../../models/activity.model';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/client/services/activity.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {
  activites: ActivityModel[];
  page: number = 1;
  page_size: number = 1;
  type: string = 'all';
  //
  isShowRegisterPopup: boolean = false;
  //
  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
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
        console.log('res', res);

        this.activites = res.results;
      })
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
}
