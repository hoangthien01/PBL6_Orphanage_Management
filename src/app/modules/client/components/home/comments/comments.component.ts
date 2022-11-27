import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
