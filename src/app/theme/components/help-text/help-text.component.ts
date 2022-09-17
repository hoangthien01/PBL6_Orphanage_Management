import {Component, HostBinding, Input, OnInit} from '@angular/core';
//
import { DomHelper } from 'src/app/utilities';
@Component({
    selector: 'app-help-text',
    templateUrl: './help-text.component.html',
    styleUrls: ['./help-text.component.scss']
})
export class HelpTextComponent implements OnInit {

    /**
     * Help Text has 2 type:
     *  1 - info
     *  2 - warning
     *
     *  Each type: has 2 type
     *  + Tooltip
     *  + Content that is close to icon
     */
    @HostBinding('style') _style: string;
    @Input()
    set style(value: string) {
        if (typeof value === 'string') {
            this._style = value ?? null;
        }
    }

    // Icon
    @Input() type: 'info' | 'warning'= 'info';
    @Input() iconColor: string;
    @Input() width: number = 12;
    //
    @Input() text: string = '';
    @Input() textCustomClass: string;
    @Input() textCustomStyle: Record<string, string>;

    // Tooltip
    @Input() position: string = 'top';
    @Input() targetClass: string = ''; // Deprecated!! Remove later
    @Input() tooltipWidth: number | string = 'auto';
    @Input() tooltipContentClass: string = 'tooltip-content-template';
    @Input() deferRendering: boolean = true;
    @Input() isEnabledToolTip: boolean = true;

    constructor() {
    }

    ngOnInit() {
        this.initIconColor();
    }

    initIconColor() {
        if(!!this.iconColor) {
            return;
        }
        //
        switch (this.type) {
            case 'info':
                this.iconColor = '#777';
                break;
            case 'warning':
                this.iconColor = '#DC6565';
                break;
        }
    }

    /**
     * Event Handler
     */
    onClick(event: Event): void {
        DomHelper.preventSpreadingEvent(event);
    }

    // #region Helper
    getTextClassHandler = () => {
        if (!!this.textCustomClass) {
            return this.textCustomClass;
        }
        //
        switch (this.type) {
            case 'info':
                return 'warning-message__notification';
            case 'warning':
                return 'warning-message__error';
            default:
                return 'warning-message__notification';
        }
    };
    // #endregion
}
