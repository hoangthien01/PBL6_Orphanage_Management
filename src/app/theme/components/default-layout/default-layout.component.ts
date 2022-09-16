import {Component, Input, TemplateRef} from '@angular/core';

type MainContentTypes = 'normal' | 'grid-without-title';

// TODO: Rename to 'app-page-content-layout'
@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
    @Input() headerTemplate: TemplateRef<any>;
    @Input() mainTemplate: TemplateRef<any>;
    @Input() footerTemplate: TemplateRef<any>;
    //
    @Input() wrapperTemplateClass: string = '';
    @Input() headerTemplateClass: string = '';
    @Input() mainTemplateClass: string = '';
    //
    @Input() hasHeader: boolean = true;
    @Input() hasLoadingDuringInit: boolean = true;
    @Input() isInit: boolean = false;
    //
    @Input() mainContentType: MainContentTypes = 'normal';

    constructor() {

    }
}
