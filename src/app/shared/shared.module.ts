import {NgModule} from '@angular/core';
//
import {ThemeModule} from '@app/theme/theme.module';
const BASE_MODULES = [
];

const THIRD_PARTY_PACKAGES = [];
@NgModule({
    imports: [
        ...BASE_MODULES,
        ...THIRD_PARTY_PACKAGES,
        ThemeModule
    ],
    declarations: [
    ],
    exports: [
        ...BASE_MODULES,
    ]
})
export class SharedModule {
}
