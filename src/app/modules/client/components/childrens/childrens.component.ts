import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ChildrenModel} from "@app/modules/children/models";
import {GENDER_TYPES} from "@app/shared/app.constants";
import {ChildrenService} from "@app/modules/children/services/children-management.service";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";
import { ChildrenClientService } from '../../services/children.service';

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrensComponent implements OnDestroy, OnInit {
    childrenDataSource: ChildrenModel[];
    //
    pagingSize: number = 100;
    pageIndexDefault: number = 0;
    //
    isLoading: boolean = false;
    genderLookup = GENDER_TYPES;
    //
    constructor(private childrenService: ChildrenService,
                private childrenClientService: ChildrenClientService,
                private _router: Router,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.getListChildrens();
    }

    ngOnDestroy(): void {
    }

    getListChildrens() {
        this.isLoading = true;
        //
        const data = {
            page: this.pageIndexDefault + 1,
            pageSize: this.pagingSize,
            name: '',
            status: 'all',
        }
        // this.getSearchParamsBeforeSending(loadOptions);
        return this.childrenService.getListChildrens(data)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                    this.changeDetector.detectChanges();
            }))
            .subscribe((res) => {
                this.childrenDataSource = res.results;
            });
    }

    register(children: ChildrenModel) {
        const data = {
            children: children.id,
            adopt_request_detail: history.state.adop_id,
        }
        this.childrenClientService.sendRegisterRequest(data).subscribe(
            res => {
                this._router.navigate([`children/${children.id}/register`]).then();
            }
        )
    }
}
