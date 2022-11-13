import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ChildrenModel} from "@app/modules/children/models";
import {GENDER_TYPES} from "@app/shared/app.constants";
import {finalize} from "rxjs/operators";
import {UserLoggedInModel} from "@app/core/store/models";
import {Observable, Subscription} from "rxjs";
import {Select} from "@ngxs/store";
import {UserSelectors} from "@app/core/store";
import { Router } from '@angular/router';
import { RegisterChildRequestModel } from '@app/modules/client/models/request/register-child.model';
import { familyStatus } from '@app/modules/client/data/enum/family-status.enum';
import { maritalStatus } from '@app/modules/client/data/enum/marital-status.enum';
import { FAMILY_STATUS } from '@app/modules/client/data/const/family-status.const';
import { MARITAL_STATUS } from '@app/modules/client/data/const/marital-status.const';
import { ChildrenClientService } from '../../../services/children.service';


@Component({
    selector: 'app-children-register',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterChildrenComponent implements OnDestroy, OnInit {
    @Select(UserSelectors.userLogged) userLogged$: Observable<UserLoggedInModel>;
    //
    childrenDataSource: ChildrenModel[];
    currentUser: UserLoggedInModel = new UserLoggedInModel();
    //
    pagingSize: number = 10;
    pageIndexDefault: number = 0;
    //
    isLoading: boolean = false;
    isSaving: boolean = false;
    genderLookup = GENDER_TYPES;
    MARITAL_STATUS = MARITAL_STATUS;
    FAMILY_STATUS = FAMILY_STATUS;
    file: any[] = [];
    requestChild: RegisterChildRequestModel = new RegisterChildRequestModel();
    //
    private _subscription : Subscription = new Subscription();
    //
    constructor(private childrenService: ChildrenClientService,
                private router: Router,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._subscription.add(this.userLogged$.subscribe((res) => {
            this.currentUser = res;
            this.changeDetector.detectChanges();
        }));
        // this.getListChildrens();
    }

    ngOnDestroy(): void {
    }

    // getListChildrens() {
    //     this.isLoading = true;
    //     let data;
    //     //
    //     return this.childrenService.getListChildrens(data)
    //         .pipe(
    //             finalize(() => {
    //                 this.isLoading = false;
    //                 this.changeDetector.detectChanges();
    //             }))
    //         .subscribe((res) => {
    //             this.childrenDataSource = res.results;
    //         });
    // }

    register() {
        this.requestChild.proofs = this.file;
        this.isLoading = true
        this.childrenService.registerChild(this.requestChild).subscribe((res) => {
            this.router.navigateByUrl('/childrens', { state: { adop_id: res.id } }).then();
            this.isLoading = false;
        })
    }
}
