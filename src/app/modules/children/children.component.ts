import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChildrenModel } from './models';
import { ListChildrenResponseModel } from './models/children-response.model';
import { ChildrenService } from './services/children-management.service';

@Component({
  selector: 'app-children-management',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenManagementComponent implements OnInit, OnDestroy {
  childrenDataSource: ChildrenModel[];
  //
  isLoading: boolean = false;
  //
  constructor(private childrenService: ChildrenService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.childrenService.getListChildrens().subscribe(children => {

      this.childrenDataSource = children.results;
      console.log(this.childrenDataSource);
      this.changeDetector.detectChanges();
    });

  }

  ngOnDestroy(): void {
  }

  onAddChildren() {

  }
}
