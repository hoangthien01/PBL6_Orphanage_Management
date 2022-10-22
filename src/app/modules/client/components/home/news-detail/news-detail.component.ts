import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { ActivityService } from '@app/modules/client/services/activity.service';
import { ActivityModel } from '@app/modules/client/models/activity.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnDestroy {
  activity: ActivityModel;
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
    this.activityService.getActivity(id).subscribe((res) => {
      this.activity = res;
    });
  }

  ngOnDestroy(): void {
  }
}
