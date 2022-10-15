import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
