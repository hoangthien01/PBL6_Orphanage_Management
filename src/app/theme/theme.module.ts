import { HelpTextComponent } from './components/help-text/help-text.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { SideNavigationMenuComponent } from './components/side-navigation-menu/side-navigation-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import {
    LookupValuePipe,
} from './pipes';

import {
  CustomButtonComponent,
  PopupConfirmationComponent,
  ProfileAvatarComponent,
  SideBarMenuComponent,
  SvgIconComponent
} from './components';
import { FunctionPipe } from './pipes';
import { RouterModule } from '@angular/router';
import { LoadPanelComponent } from './components/load-panel/load-panel.component';
//
// import {
//     AutoFocusInputDirective,
//     AutoClickAndSelectInputDirective,
//     DisplayTagDirective,
//     DisplayTooltipDirective,
//     ImageEventListenerDirective,
// } from '@app/theme/directives';

import {
  svgIconAssigneeRoundRobin,
  svgIconBellLight,
  svgIconChevronLeft,
  svgIconFlagLight,
  svgIconHeartLight,
  svgIconJerryLogo,
  svgIconUerRegular,
  svgIconUserGroup,
  svgIconUserLight,
  svgIconAvatarDefault,
  svgIconSettingLight,
  svgIconMap,
  svgIconHome,
  svgIconPencil
} from 'src/assets/images/svg-icons.constants';
import { SvgIconsRegistry } from '@app/core/services';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
import { PopupContainerComponent } from './components/popup-container/popup-container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AttachmentPreviewPopupComponent } from './components/attachment-preview-popup/attachment-preview-popup.component';

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
  DxSortableModule,
  Daterangepicker
];

const BASE_MODULES = [
  CommonModule,
];

const SVG_ICONS = [
  svgIconChevronLeft,
  svgIconJerryLogo,
  svgIconBellLight,
  svgIconAssigneeRoundRobin,
  svgIconUserGroup,
  svgIconUserLight,
  svgIconFlagLight,
  svgIconHeartLight,
  svgIconUerRegular,
  svgIconMap,
  svgIconSettingLight,
  svgIconPencil,
  svgIconAvatarDefault,
  svgIconHome
];

const COMPONENTS = [
  CustomButtonComponent,
  SvgIconComponent,
  SideNavigationMenuComponent,
  LoadPanelComponent,
  DefaultLayoutComponent,
  SideBarMenuComponent,
  HelpTextComponent,
  UserSettingComponent,
  PopupContainerComponent,
  PageNotFoundComponent,
  PopupConfirmationComponent,
  ProfileAvatarComponent,
  DateRangePickerComponent,
  AttachmentPreviewPopupComponent
];

const PIPES = [
  FunctionPipe,
  TruncatePipe,
  LookupValuePipe
];

const DIRECTIVES = [
];

@NgModule({
  imports: [
    ...BASE_MODULES,
    ...DEVEXTREME_MODULES,
    RouterModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  exports: [
    ...BASE_MODULES,
    ...DEVEXTREME_MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    NgxPermissionsModule
  ]
})
export class ThemeModule {
  constructor(private _svgIconRegistry: SvgIconsRegistry) {
    _svgIconRegistry.registerIcons(SVG_ICONS);
}
}
