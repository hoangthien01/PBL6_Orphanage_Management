import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeClientComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
