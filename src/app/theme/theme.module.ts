import { SideNavigationMenuComponent } from './components/side-navigation-menu/side-navigation-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
//
// import {PickerModule} from '@ctrl/ngx-emoji-mart';
// import {VirtualScrollerModule} from 'ngx-virtual-scroller';
// import {Daterangepicker} from 'ng2-daterangepicker';
// import {ClickOutsideModule} from 'ng-click-outside';
// import {QuicklinkModule} from 'ngx-quicklink';
// import { ScrollingModule } from '@angular/cdk/scrolling';
//
import {
  DxAccordionModule,
  DxAutocompleteModule,
  DxButtonModule,
  DxChartModule,
  DxCheckBoxModule,
  DxColorBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFileUploaderModule,
  DxHtmlEditorModule,
  DxListModule,
  DxLoadIndicatorModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxNumberBoxModule,
  DxPopoverModule,
  DxPopupModule,
  DxProgressBarModule,
  DxRadioGroupModule,
  DxResizableModule,
  DxSchedulerModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxTagBoxModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTooltipModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxDeferRenderingModule,
  DxTabsModule,
  DxPieChartModule,
  DxTreeViewModule,
  DxSortableModule
} from 'devextreme-angular';
import { DxiColumnModule, DxoPagerModule, DxoPagingModule, DxoSelectionModule } from 'devextreme-angular/ui/nested';

// import {
//     DisplayNameNullValuePipe,
//     GridColumnNullValuePipe,
//     OrderByPipe,
//     SecondsToTimePipe,
//     SecondsToWordTime,
//     SeparateDateTimeToDatePipe,
//     SeparateDateTimeToTimeExceptSecPipe,
//     SeparateDateTimeToTimePipe,
//     StringToDatePipe,
//     TruncatePipe,
//     ValuePipe,
//     FunctionPipe,
//     RemoveHtmlTagPipe,
//     TimeEventPipe,
//     TimeAgoPipe,
//     LookupValuePipe,
//     TimeSecondPipe,
//     IsItemExistInLookupPipe
// } from './pipes';

import {
  CustomButtonComponent,
  SvgIconComponent
} from './components';
//
// import {
//     AutoFocusInputDirective,
//     AutoClickAndSelectInputDirective,
//     DisplayTagDirective,
//     DisplayTooltipDirective,
//     ImageEventListenerDirective,
// } from '@app/theme/directives';

const DEVEXTREME_MODULES = [
  DxDataGridModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxoSelectionModule,
  DxoPagerModule,
  DxoPagingModule,
  DxButtonModule,
  DxiColumnModule,
  DxCheckBoxModule,
  DxRadioGroupModule,
  DxPopoverModule,
  DxTemplateModule,
  DxRadioGroupModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxListModule,
  DxSwitchModule,
  DxTooltipModule,
  DxLookupModule,
  DxValidatorModule,
  DxValidationGroupModule,
  DxAccordionModule,
  DxDropDownBoxModule,
  DxTagBoxModule,
  DxScrollViewModule,
  DxHtmlEditorModule,
  DxChartModule,
  DxFileUploaderModule,
  DxLoadIndicatorModule,
  DxLoadPanelModule,
  DxNumberBoxModule,
  DxTabPanelModule,
  DxAutocompleteModule,
  DxSchedulerModule,
  DxColorBoxModule,
  DxProgressBarModule,
  DxResizableModule,
  DxDropDownButtonModule,
  DxDeferRenderingModule,
  DxTabsModule,
  DxPieChartModule,
  DxTreeViewModule,
  DxSortableModule
];

const BASE_MODULES = [
  CommonModule,
  // RouterModule,
  // FormsModule,
  //
  // PickerModule,
  // VirtualScrollerModule,
  // Daterangepicker,
  // ClickOutsideModule,
  // QuicklinkModule,
  // ScrollingModule
];

const COMPONENTS = [
  CustomButtonComponent,
  SvgIconComponent,
  SideNavigationMenuComponent
];

// const PIPES = [
//   TimeSecondPipe,
//   TruncatePipe,
//   StringToDatePipe,
//   SeparateDateTimeToDatePipe,
//   SeparateDateTimeToTimeExceptSecPipe,
//   SeparateDateTimeToTimePipe,
//   SecondsToWordTime,
//   SecondsToTimePipe,
//   GridColumnNullValuePipe,
//   DisplayNameNullValuePipe,
//   OrderByPipe,
//   ValuePipe,
//   FunctionPipe,
//   RemoveHtmlTagPipe,
//   TimeEventPipe,
//   TimeAgoPipe,
//   LookupValuePipe,
//   IsItemExistInLookupPipe
// ];

// const DIRECTIVES = [
//     AutoFocusInputDirective,
//     AutoClickAndSelectInputDirective,
//     DisplayTagDirective,
//     DisplayTooltipDirective,
//     ImageEventListenerDirective
// ];

@NgModule({
  imports: [
    ...BASE_MODULES,
    ...DEVEXTREME_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    // ...PIPES,
    // ...DIRECTIVES,
  ],
  exports: [
    // ...BASE_MODULES,
    ...DEVEXTREME_MODULES,
    ...COMPONENTS,
    // ...PIPES,
    // ...DIRECTIVES
  ]
})
export class ThemeModule {
}
