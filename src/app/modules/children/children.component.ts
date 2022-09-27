import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-children-management',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenManagementComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
