import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-client-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
