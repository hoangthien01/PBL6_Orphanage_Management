import { finalize } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { DonerService } from "../../services/doner.service";

@Component({
  selector: 'app-home-overview-status',
  templateUrl: './overview-status.component.html',
  styleUrls: ['./overview-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOverviewStatusComponent {
    data = [];

    constructor(
		private cdr: ChangeDetectorRef,
		private store: Store,
        private donorService: DonerService
	) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getOverviewStatus();
    }

    getOverviewStatus() {
        this.donorService.getOverviewStatus().pipe(
            finalize(() => {
                this.cdr.detectChanges()
            })
        ).subscribe(
            res => {
                this.data = res;
            }
        )
    }
}
