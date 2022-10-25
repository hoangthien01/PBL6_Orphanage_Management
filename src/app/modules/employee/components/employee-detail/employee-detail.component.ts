import {Component, EventEmitter, OnInit, Output, ViewChild, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
import {DxPopupComponent} from 'devextreme-angular/ui/popup';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';

//
// import {ProspectStatusNewType} from '@app/shared/enums';
import {BaseService} from '@app/core/services';
import { EmployeeModel } from '../../models';
import { EmployeeService } from '../../services/employee-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
    @ViewChild('addProspectPopup') addProspectPopup: DxPopupComponent;
    @ViewChild('firstNameTextBox') firstNameTextBox: DxTextBoxComponent;
    @ViewChild('lastNameTextBox') lastNameTextBox: DxTextBoxComponent;
    @ViewChild('addNewProspectValidationGroup') addNewProspectValidationGroup: DxValidationGroupComponent;

    private _visible: boolean;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    isDataValid: boolean = false;
    isProcessing: boolean = false;

    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store,
                private route: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService,
                private employeeService: EmployeeService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataValid = this.checkIsDataValid();
            this.cdr.detectChanges();
        }));
    }

    ngOnInit() {
      //
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }


    resetPopup() {
    }

    hidePopup() {
        this.visible = false;
    }

    dataChanged() {
        this._valueChanged$.next();
    }

    checkIsDataValid() {
      return true;
    }
}
