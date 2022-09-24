import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular/ui/popup';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { Key } from 'ts-keycode-enum';
//
import { CommonFunction } from 'src/app/utilities';
import { POPUP_ANIMATION_DEFAULT } from '@app/shared/app.constants';

type PopupConfirmationTypes = 'confirm' | 'delete';

@Component({
    selector: 'app-popup-confirmation',
    templateUrl: './popup-confirmation.component.html',
    styleUrls: ['./popup-confirmation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupConfirmationComponent implements OnInit {
    @ViewChild('popup', { static: false }) popup: DxPopupComponent;
    @ViewChild('scrollView', { static: false }) scrollView: DxScrollViewComponent;

    private _visible: boolean = false;
    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }

    @Input() isSaving: boolean = false;
    @Input() width: number | string = 'auto';
    @Input() height: number | string = 'auto';
    @Input() maxHeight: number | string = 'auto';
    @Input() title: string;
    @Input() showCloseButton: boolean = true;
    @Input() dragEnabled: boolean = false;
    @Input() customClass: string;
    @Input() confirmButtonTitle: string = 'YES';
    @Input() deleteButtonTitle: string = 'DELETE';
    @Input() cancelButtonTitle: string = 'Cancel';
    @Input() type: PopupConfirmationTypes = 'confirm';
    @Input() disabled: boolean = false;
    @Input() isProcessing: boolean = false;
    @Input() isHiddenWhenClickEscapedButton: boolean = true;
    @Input() confirmButtonWidth: number | string = 115;
    @Input() deleteButtonWidth: number | string = 115;
    @Input() cancelButtonWidth: number | string = 115;
    // Template
    @Input() conditionalAgreementTemplate: TemplateRef<any>;
    @Input() footerTemplate: TemplateRef<any>;

    /* eslint-disable @angular-eslint/no-output-on-prefix */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onHiding: EventEmitter<void> = new EventEmitter<void>();
    @Output() onHidingByClickedOnCloseButton: EventEmitter<void> = new EventEmitter<void>();
    @Output() onShowing: EventEmitter<any> = new EventEmitter<any>();
    @Output() onShowed: EventEmitter<any> = new EventEmitter<any>();
    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    POPUP_ANIMATION_DEFAULT = POPUP_ANIMATION_DEFAULT;

    @HostListener('document:keyup.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        const isEscClicked = CommonFunction.IsKeyCodeMatch(event, Key.Escape, 'Escape');
        if (isEscClicked && this.visible && this.isHiddenWhenClickEscapedButton) { // ESC
            this.visible = false;
        }
    }

    constructor() {
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() {
    }

    onInitialized(e: any) {
        this.disableDefaultEscapeEventDxPopupElement(e);
    }

    disableDefaultEscapeEventDxPopupElement(e: any) {
        e.component.registerKeyHandler('escape', (event: Event) => {
            event.stopPropagation();
        });
    }

    repaintPopup() {
        setTimeout(() => {
            this.popup.instance.repaint();
        });
    }

    onPopupShowing(e: any) {
        this.onShowing.emit(e);
    }

    onPopupShowed(e: any) {
        this.onShowed.emit(e);
    }

    onPopupHidden(e) {
        this.visible = false;
    }

    onPopupHiding(e) {
        this.onHiding.emit();
    }

    /**
     * Event Handler
     */
    hidePopup() {
        this.onHiding.emit();
        //
        this.visible = false;
    }

    onCloseButtonClicked() {
        this.onHidingByClickedOnCloseButton.emit();
        //
        this.hidePopup();
    }

    onConfirmClicked() {
        this.onConfirm.emit();
        //
        this.hidePopup();
    }

    delete() {
        this.onDelete.emit();
        //
        this.hidePopup();
    }

    onCancelClicked() {
        this.onCancel.emit();
        //
        this.hidePopup();
    }
}
