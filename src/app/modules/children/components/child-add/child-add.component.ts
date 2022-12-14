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
import { ChildrenService } from '../../services/children-management.service';

@Component({
    selector: 'app-child-add',
    templateUrl: './child-add.component.html',
    styleUrls: ['./child-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildAddComponent implements OnInit, OnDestroy {
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
    @Input() userAssignSource: ListItemModel<string, string>[] = [];

    @Output() refreshGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    prospectMessages = PROSPECT_MESSAGE;
    POPUP_ANIMATION = POPUP_ANIMATION;
    genderLookup = GENDER_TYPES;

    child: ChildrenModel = new ChildrenModel();
    file: any[] = [];
    url: any;
    //
    isDataValid: boolean = false;
    isProcessing: boolean = false;
    //
    private _valueChanged$: Subject<void> = new Subject<void>();
    private _subscriptions: Subscription = new Subscription();
    //
    constructor(private _store: Store,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService,
                private childrenService: ChildrenService) {
        this._subscriptions.add(this._valueChanged$.pipe(debounceTime(300)).subscribe(() => {
            this.isDataValid = this.checkIsDataValid();
            this.cdr.detectChanges();
        }));
    }

    @HostListener('document:keydown.escape', ['$event']) onEscapeHandle(event: KeyboardEvent) {
        const isEscClicked = CommonFunction.IsKeyCodeMatch(event, Key.Escape, 'Escape');
        if (isEscClicked && this.visible) { // ESC
            this.hidePopup();
        }
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    focusToFirstNameTextBox() {
        setTimeout(() => {
            this.firstNameTextBox.instance.focus();
        }, 300);
    }

    checkIsDataValid(): boolean {
        if ((!this.child.name || !this.child.name.trim())
            || !this.child.age || !this.child.gender) {
            return false;
        }
        return true;
    }

    addChild(isKeepPopup: boolean) {
        if (!this.isDataValid) {
            return;
        }
        //
        console.log('file', this.file);
        const data = {
          name: this.child.name,
          age: this.child.age.toString(),
          gender: this.child.gender.toString(),
          personal_picture: this.file[0]

        }
        this.isProcessing = true;
        this.childrenService.addChild(data)
            .pipe(finalize(() => {
              this.isProcessing = false;
              this.cdr.detectChanges();
            }))
            .subscribe(res => {
                if (res) {
                    AppNotify.success('Th??m th??ng tin tr??? th??nh c??ng');
                    if (isKeepPopup) {
                        this.resetPopup();
                        this.file = [];
                        this.url = '';
                        this.focusToFirstNameTextBox();
                    } else {
                        this.hidePopup();
                    }

                    this.refreshGrid.emit(true);
                }
            });
    }

    onFileSelected(event) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.url = event.target.result;
        };
        reader.onerror = (event: any) => {
            console.log("File could not be read: " + event.target.error.code);
        };
        reader.readAsDataURL(event.target.files[0]);
        setTimeout(() => {
            this.cdr.detectChanges();
        }, 500)
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

    /**
     * Event Handler
     */

    /**
     * Handle validation
     */
}
