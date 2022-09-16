import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-load-panel',
    templateUrl: './load-panel.component.html',
    styleUrls: ['./load-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadPanelComponent {
    @Input() isLoading: boolean = false;
    @Input() isApplyToGridLoading: boolean = false;
    @Input() customClass: string = '';
    @Input() customStyle: Record<string, string>;

    constructor() {
    }
}
