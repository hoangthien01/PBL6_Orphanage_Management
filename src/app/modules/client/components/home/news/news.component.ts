import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
