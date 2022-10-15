import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
