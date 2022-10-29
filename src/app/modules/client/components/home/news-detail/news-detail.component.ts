import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/activity/services/activity.service';
import { ActivityModel } from '@app/modules/activity/models/activity.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnDestroy {
  activity: ActivityModel;
  //
  isLoading: boolean = false;
  //
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;
    this.activityService.getActivity(id).subscribe((res) => {
      this.activity = res;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
  }
}
