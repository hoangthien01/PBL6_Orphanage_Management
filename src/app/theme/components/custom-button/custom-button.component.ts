import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DxButtonComponent} from 'devextreme-angular/ui/button';
//
import {AppFontTypes} from '@app/shared/app.enum';

type ButtonTypes =
    | 'primary'
    | 'primary-outline'
    | 'primary-outline-without-border'
    | 'delete'
    | 'delete-outline'
    | 'delete-outline-without-border'
    | 'cancel'
    | 'bg-white-color-inherit'
    | 'custom-style';
type ButtonFontTypes = 'gotham-book' | 'gotham-medium' | 'gotham-bold';

@Component({
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomButtonComponent {
    @ViewChild('dxButton') dxButton: DxButtonComponent;

    @Input() customClass: string = '';
    @Input() height: number | string = '100%';
    @Input() width: number | string = '100%';
    @Input() text: string = 'SAVE';
    @Input() icon: string;
    @Input() disabled: boolean = false;
    @Input() hidden: boolean = false;
    @Input() type: ButtonTypes = 'primary';
    @Input() customStyle: Record<string, string> = {
        color: '',
        backgroundColor: '',
        border: '',
    };
    //
    @Input() font: ButtonFontTypes = 'gotham-medium';

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    AppFontTypes = AppFontTypes;

    constructor() {
    }

    public focus() {
        if (this.dxButton) {
            this.dxButton.instance.focus();
        }
    }
}
