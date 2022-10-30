import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivityTypeModel } from '@app/modules/activity/models/activity-type.model';
import { ActivityModel } from '@app/modules/activity/models/activity.model';
import { ActivityService } from '@app/modules/activity/services/activity.service';
import { POPUP_ANIMATION } from '@app/shared/app.constants';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
//
@Component({
  selector: 'app-activity-setting-popup',
  templateUrl: './activity-setting-popup.component.html',
  styleUrls: ['./activity-setting-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitySettingPopupComponent implements OnInit, OnDestroy {
  private _visible: boolean;

  @Input()
  get visible(): boolean {
      return this._visible;
  }

  set visible(value: boolean) {
      this._visible = value;
      this.visibleChange.emit(value);
  }
  @Input() activity: ActivityModel = new ActivityModel();
  //
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSaveSetting: EventEmitter<ActivityModel> = new EventEmitter<ActivityModel>();
  //
  POPUP_ANIMATION = POPUP_ANIMATION;
  activityTypes: ActivityTypeModel[];
  file: any[] = [];
  //
  isDataValid: boolean = false;
  isProcessing: boolean = false;
  //
  private _valueChanged$: Subject<void> = new Subject<void>();
  private _subscriptions: Subscription = new Subscription();
  //
  constructor(private changeDetector: ChangeDetectorRef,
              private activityService: ActivityService) {
    this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
      this.isDataValid = this.checkIsDataValid();
      this.changeDetector.detectChanges();
    }));
  }

  ngOnInit(): void {
    this.getActivityTypes();
  }

  ngOnDestroy(): void {
  }

  checkIsDataValid(): boolean {
    if ((!this.file || !this.activity.expense)
        || !this.activity.activity_type) {
        return false;
    }
    return true;
}

  resetPopup() {
    this.activity = new ActivityModel();
    this.file = [];
  }

  hidePopup() {
      this.visible = false;
  }

  dataChanged() {
      this._valueChanged$.next();
  }

  getActivityTypes() {
    this.activityService.getActivityTypes().subscribe(
      res => {
        this.activityTypes = res;
      }
    )
  }

  SaveSetting() {
    this.activity.cover_picture = this.file[0];
    setTimeout(() => {
      this.onSaveSetting.emit(this.activity);
      this.hidePopup();
    })
  }

  onChangeDateRange(e) {
    if (e !== null) {
        this.activity.start_date = e.start.toISOString().split('T')[0];
        this.activity.end_date = e.end.toISOString().split('T')[0];
    }
  }

  onResetDate() {
    this.activity.start_date = null;
    this.activity.end_date = null;
  }
}
