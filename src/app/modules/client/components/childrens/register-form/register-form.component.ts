import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ChildrenModel} from "@app/modules/children/models";
import {GENDER_TYPES} from "@app/shared/app.constants";
import {ChildrenService} from "@app/modules/children/services/children-management.service";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-children-register',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterChildrenComponent implements OnDestroy, OnInit {
    childrenDataSource: ChildrenModel[];
    //
    pagingSize: number = 10;
    pageIndexDefault: number = 0;
    //
    isLoading: boolean = false;
    isSaving: boolean = false;
    genderLookup = GENDER_TYPES;
    maritalStatus = [
        'Độc thân',
        'Đã kết hôn'
    ];
    familyStatus = [
        'Sống cùng bố mẹ',
        'Sống riêng'
    ]
    //
    constructor(private childrenService: ChildrenService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.getListChildrens();
    }

    ngOnDestroy(): void {
    }

    getListChildrens() {
        this.isLoading = true;
        let data;
        //
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

    register() {

    }
}
