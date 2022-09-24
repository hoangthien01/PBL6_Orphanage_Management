import {
    Component, EventEmitter, HostListener, Input,
    OnInit, Output, TemplateRef, ViewChild
} from '@angular/core';
import {Key} from 'ts-keycode-enum';
import {DxPopupComponent, DxScrollViewComponent} from 'devextreme-angular';
import {positionConfig} from 'devextreme/animation/position';
//
import {CommonFunction} from 'src/app/utilities';
import {POPUP_ANIMATION_DEFAULT} from '@app/shared/app.constants';

@Component({
    selector: 'app-popup-container',
    templateUrl: './popup-container.component.html',
    styleUrls: ['./popup-container.component.scss']
})
export class PopupContainerComponent implements OnInit {
    @ViewChild('popup', {static: false}) popup: DxPopupComponent;
    @ViewChild('scrollViewComponent', { static: false }) scrollViewComponent: DxScrollViewComponent;

    private _visible: boolean = false;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }

    @Input() width: number | string = 'auto';
    @Input() height: number | string = 'auto';
    @Input() title: string;
    @Input() position: string | positionConfig = 'right';
    @Input() showCloseButton: boolean = true;
    @Input() dragEnabled: boolean = false;
    @Input() customPopupAnimation = POPUP_ANIMATION_DEFAULT;
    @Input() closeOnOutsideClick: boolean = false;
    @Input() closeOnEscapeClick: boolean = true;
    // Styles
    @Input() customClass: string;
    @Input() hasBorderRadius: boolean = false;
    @Input() isOverlayWrapperHasBackgroundColor: boolean = true;
    //
    @Input() fullScreen: boolean = false;
    @Input() scrollEnabled: boolean = true;
    @Input() deferRendering: boolean = true;
    //
    @Input() contentTemplate: TemplateRef<any>;
    @Input() footerTemplate: TemplateRef<any>;
    @Input() headerTemplate: TemplateRef<any>;
    @Input() topNavTemplate: TemplateRef<any>;

    /* eslint-disable @angular-eslint/no-output-on-prefix */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onShowing: EventEmitter<any> = new EventEmitter<any>();
    @Output() onShown: EventEmitter<any> = new EventEmitter<any>();
    @Output() onHidden: EventEmitter<void> = new EventEmitter<void>();
    @Output() onHiding: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    @HostListener('document:keyup.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        const isEscClicked = CommonFunction.IsKeyCodeMatch(event, Key.Escape, 'Escape');
        if (isEscClicked && this.visible && this.closeOnEscapeClick) { // ESC
            this.visible = false;
        }
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

    onPopupShowing(e: any): void {
        this.onShowing.emit(e);
    }

    onPopupShown(e: any): void {
        this.onShown.emit(e);
    }

    onPopupHidden(e: any): void {
        this.onHidden.emit(e);
        //
        this.visible = false;
    }

    onPopupHiding(e: any): void {
        this.onHiding.emit();
    }
}
