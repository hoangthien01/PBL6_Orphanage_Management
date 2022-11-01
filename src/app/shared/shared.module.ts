import {NgModule} from '@angular/core';
//
import {ThemeModule} from '@app/theme/theme.module';
const BASE_MODULES = [../theme/components/attachment-preview-popup/attachment-preview-popup.component
];

const COMPONENTS = [
]

const THIRD_PARTY_PACKAGES = [];
@NgModule({
    imports: [
        ...BASE_MODULES,
        ...THIRD_PARTY_PACKAGES,
        ThemeModule
    ],
    declarations: [
      ...COMPONENTS
    ],
    exports: [
        ...BASE_MODULES,
    ]
})
export class SharedModule {
}
