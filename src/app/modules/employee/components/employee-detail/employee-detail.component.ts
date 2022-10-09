import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {debounceTime, finalize} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {Key} from 'ts-keycode-enum';
import { Store } from '@ngxs/store';
import {DxPopupComponent} from 'devextreme-angular/ui/popup';
import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';

//
import { AppNotify, CommonFunction } from 'src/app/utilities';
// import {ProspectStatusNewType} from '@app/shared/enums';
import {PROSPECT_MESSAGE} from '@app/shared/message';
import {GENDER_TYPES, POPUP_ANIMATION, PROSPECT_FIELD_NAMES} from '@app/shared/app.constants';
import {ListItemModel } from '@app/shared/models';
import {BaseService} from '@app/core/services';
import { ChildrenModel } from '../../models';
import { EmployeeService } from '../../services/employee-management.service';

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
    @Input() child: ChildrenModel;
    @Output() refreshGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    prospectMessages = PROSPECT_MESSAGE;
    POPUP_ANIMATION = POPUP_ANIMATION;
    genderLookup = GENDER_TYPES;

    isDataValid: boolean = false;
    isProcessing: boolean = false;

    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService,
                private employeeService: EmployeeService) {
        // this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
        //     this.isDataValid = this.checkIsDataValid();
        //     this.cdr.detectChanges();
        // }));
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }


    resetPopup() {
        this.child = new ChildrenModel();
    }

    hidePopup() {
        this.visible = false;
    }

    dataChanged() {
        this._valueChanged$.next();
    }
}
