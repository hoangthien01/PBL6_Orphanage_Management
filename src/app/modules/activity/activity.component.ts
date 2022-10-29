import { finalize } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivityModel } from './models/activity.model';
import { ActivityService } from './services/activity.service';
import { AppNotify } from '@app/utilities';
//
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent implements OnInit, OnDestroy {
  title: string;
  content = '';
  isDataValid: boolean = false;
  isShowSettingPopup: boolean = false;
  isProcessing: boolean = false;
  activity: ActivityModel = new ActivityModel();
  //
  constructor(private changeDetector: ChangeDetectorRef,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  addActivity() {
    this.isProcessing = true
    this.activityService.createActivity(this.activity)
    .pipe(
      finalize(() => {
        this.isProcessing = false;
      }
    )).subscribe((res) => {
      AppNotify.success(AppNotify.generateSuccessMessage('Activity', 'added'));
    });
  }

  openSetting() {
    this.isShowSettingPopup = true;
  }

  saveActivitySetting(actitivity: ActivityModel) {
    this.activity.cover_picture = actitivity.cover_picture;
    this.activity.expense = actitivity.expense;
    this.activity.activity_type = actitivity.activity_type;
    this.activity.start_date = actitivity.start_date;
    this.activity.end_date = actitivity.end_date;
  }
}
