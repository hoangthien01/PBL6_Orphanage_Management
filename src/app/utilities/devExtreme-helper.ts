import * as events from 'devextreme/events';
import { isEqual } from 'lodash-es';
// import Component from 'devextreme/core/component';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxDropDownEditor from 'devextreme/ui/drop_down_editor/ui.drop_down_editor';
import dxPopup from 'devextreme/ui/popup';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { DxTagBoxComponent } from 'devextreme-angular/ui/tag-box';
//
import { GridColumnBaseModel } from '@app/shared/models';
import { FilterParamsSortingTypes, SortingTypes } from '@app/shared/app.enum';

export class DevExtremeComponentHelper {
    public static beginUpdate(dxComponent: { instance: any }) {
        if (!dxComponent || !dxComponent.instance) {
            return;
        }
        //
        dxComponent.instance.beginUpdate();
    }

    public static endUpdate(dxComponent: { instance: any }) {
        if (!dxComponent || !dxComponent.instance) {
            return;
        }
        //
        dxComponent.instance.endUpdate();
    }

    // public static openDropdown(dxComponent: { instance: dxDropDownEditor }, timeout: number = 0, isFocusInInput: boolean = false) {
    //     setTimeout(() => {
    //         if (dxComponent && dxComponent.instance) {
    //             if (isFocusInInput) {
    //                 const inputElement: HTMLElement = dxComponent.instance.field();
    //                 inputElement.click();
    //             } else {
    //                 dxComponent.instance.element().click();
    //             }
    //             dxComponent.instance.open();
    //         }
    //     }, timeout);
    // }
}
// TODO: Should DxScrollViewHelper
export class ScrollViewHelper {
    public static scrollToBottom(scrollViewComponent: DxScrollViewComponent, timeout: number = 200) {
        setTimeout(() => {
            if (scrollViewComponent && scrollViewComponent.instance) {
                const scrollHeight: number = scrollViewComponent.instance.scrollHeight();
                scrollViewComponent.instance.scrollTo({
                    top: scrollHeight,
                    bottom: 0
                });
            }
        }, timeout);
    }

    public static scrollToTop(scrollViewComponent: DxScrollViewComponent, timeout: number = 200) {
        setTimeout(() => {
            if (scrollViewComponent && scrollViewComponent.instance) {
                scrollViewComponent.instance.scrollTo(0);
            }
        }, timeout);
    }

    public static scrollToRight(scrollViewComponent: DxScrollViewComponent, timeout: number = 200) {
        setTimeout(() => {
            if (scrollViewComponent && scrollViewComponent.instance) {
                const scrollWidth: number = scrollViewComponent.instance.scrollWidth();
                scrollViewComponent.instance.scrollTo({
                    left: scrollWidth,
                    right: 0
                });
            }
        }, timeout);
    }

    public static updateScrollViewHeight(scrollViewComponent: DxScrollViewComponent, timeout: number = 200) {
        setTimeout(() => {
            if (scrollViewComponent && scrollViewComponent.instance) {
                scrollViewComponent.instance.update();
            }
        }, timeout);
    }

    /**
     * Enable Native ScrollBar that is inside of ScrollView Component
     */
    public static enableStopMouseWheel(scrollElement: Element | HTMLElement | any) {
        if (!scrollElement) {
            return;
        }
        //
        events.on(scrollElement, 'dxmousewheel', null, (ev) => {
            ev.stopPropagation();
        });
    }

    public static disableStopMouseWheel(scrollElement: Element | HTMLElement | any) {
        if (!scrollElement) {
            return;
        }
        //
        events.off(scrollElement, 'dxmousewheel');
    }
}

// TODO: Should DxTagBoxHelper
export class TagBoxHelper {
    public static setAllSelectedTagDisplay(event: any, totalCount: number, itemName: string = null) {
        const selectedItemsLength: number = event.selectedItems.length;
        //
        if (selectedItemsLength === 0) {
            event.text = '';
            return;
        }
        //
        if (itemName) {
            event.text = selectedItemsLength < totalCount ? `${selectedItemsLength} ${selectedItemsLength > 1 ? itemName + 's' : itemName} selected` : `All ${itemName}s selected`;
        } else {
            event.text = selectedItemsLength < totalCount ? event.text : 'All selected';
        }
    }

    public static openDropdown(tagBox: DxTagBoxComponent) {
        // click() to make TagBox reset default status of dataSource
    //     const inputElement: HTMLElement = tagBox.instance.field();
    //     inputElement.click();
    //     //
    //     tagBox.instance.open();
    }
}

// TODO: Should DxDataGridHelper
// export class DataGridHelper {
//     public static isProspectColumnsInfoUpdated(currentColumnsSetting: ProspectGridFieldModel, dataGridInstance: dxDataGrid): {
//         isColumnsInfoUpdated: boolean;
//         newColumnsSetting: ProspectGridFieldModel;
//     } {
//         const newColumnsSetting = new ProspectGridFieldModel();
//         const colCount: number = dataGridInstance.columnCount();

//         for (let index = 0; index <= colCount - 1; index++) {
//             const fixed: boolean = dataGridInstance.columnOption(index, 'fixed');
//             if (fixed) {
//                 continue;
//             }
//             //
//             const visibleIndex: number = dataGridInstance.columnOption(index, 'visibleIndex');
//             const isVisible: boolean = dataGridInstance.columnOption(index, 'visible');
//             const width: number = dataGridInstance.columnOption(index, 'width');
//             //
//             if (visibleIndex !== undefined) {
//                 const columnName = dataGridInstance.columnOption(index, 'name');
//                 //
//                 if (newColumnsSetting[columnName]) {
//                     newColumnsSetting[columnName].width = width;
//                     newColumnsSetting[columnName].orderIndex = visibleIndex;
//                     newColumnsSetting[columnName].isVisible = isVisible != null ? isVisible : false;
//                 } else {
//                     newColumnsSetting[columnName] = new GridColumnBaseModel({
//                         width: width,
//                         orderIndex: visibleIndex,
//                         isVisible: isVisible != null ? isVisible : false,
//                     });
//                 }
//             }
//         }

//         return {
//             isColumnsInfoUpdated: !isEqual(currentColumnsSetting, newColumnsSetting),
//             newColumnsSetting: newColumnsSetting
//         };
//     }

//     public static isColumnsInfoUpdated<T>(
//         GridFieldModel: new () => T,
//         currentColumnsInfo: T,
//         dataGridInstance: dxDataGrid,
//         savedProperties: {
//             hasWidth: boolean;
//             hasOrderIndex: boolean;
//             hasIsVisible: boolean;
//         } = { hasWidth: true, hasOrderIndex: true, hasIsVisible: true }): {
//             isColumnsInfoUpdated: boolean;
//             newColumnsInfo: T;
//         } {
//         const newColumnsInfo: T = new GridFieldModel();
//         const colCount: number = dataGridInstance.columnCount();

//         for (let index = 0; index <= colCount - 1; index++) {
//             const fixed: boolean = dataGridInstance.columnOption(index, 'fixed');
//             if (fixed) {
//                 continue;
//             }
//             //
//             const width: number = savedProperties.hasWidth
//                 ? dataGridInstance.columnOption(index, 'width')
//                 : null;
//             const orderIndex: number = savedProperties.hasOrderIndex
//                 ? dataGridInstance.columnOption(index, 'visibleIndex')
//                 : null;
//             const isVisible: boolean = savedProperties.hasIsVisible
//                 ? dataGridInstance.columnOption(index, 'visible')
//                 : null;
//             //
//             const columnName: string = dataGridInstance.columnOption(index, 'name');
//             //
//             if (newColumnsInfo[columnName]) {
//                 if (savedProperties.hasWidth) {
//                     newColumnsInfo[columnName].width = width;
//                 }
//                 if (savedProperties.hasOrderIndex) {
//                     newColumnsInfo[columnName].orderIndex = orderIndex;
//                 }
//                 if (savedProperties.hasIsVisible) {
//                     newColumnsInfo[columnName].isVisible = isVisible != null ? isVisible : false;
//                 }
//             } else {
//                 // For Prospect Grid - Custom Fields
//                 newColumnsInfo[columnName] = new GridColumnBaseModel({
//                     width: savedProperties.hasWidth ? width : null,
//                     orderIndex: savedProperties.hasOrderIndex ? orderIndex : null,
//                     isVisible: savedProperties.hasIsVisible
//                         ? isVisible != null
//                             ? isVisible : false
//                         : null,
//                 });
//             }
//         }

//         return {
//             isColumnsInfoUpdated: !isEqual(currentColumnsInfo, newColumnsInfo),
//             newColumnsInfo: newColumnsInfo
//         };
//     }

//     // Sort Single Field
//     // public static getSortingFilterParams(sortInfo: { selector: string; desc: boolean }, sortColumnDefault: string, isDescSortDefault: boolean): {
//     //     sortColumn: string;
//     //     sortOrder: FilterParamsSortingTypes;
//     // } {
//     //     if (!sortInfo || !sortInfo.selector) {
//     //         return {
//     //             sortColumn: sortColumnDefault.toUpperCaseFirstChar(),
//     //             sortOrder: isDescSortDefault ? FilterParamsSortingTypes.Descending : FilterParamsSortingTypes.Ascending
//     //         };
//     //     }
//     //     //
//     //     let sortColumn: string;
//     //     const sortColumnArr: string[] = sortInfo.selector.split('.');

//     //     switch (sortColumnArr.length) {
//     //         case 1:
//     //             sortColumn = sortInfo.selector.toUpperCaseFirstChar();
//     //             break;
//     //         case 2:
//     //             // For assignee.name
//     //             sortColumn = sortColumnArr[0].toUpperCaseFirstChar() + '.' + sortColumnArr[1].toUpperCaseFirstChar();
//     //             break;
//     //         case 3:
//     //             // For CustomField DataField: CustomFields.<idCustomField>.Value
//     //             if (sortColumnArr[0].toLowerCaseFirstChar().startsWith('customFields')) {
//     //                 sortColumn = sortInfo.selector.toUpperCaseFirstChar();
//     //             }
//     //             break;
//     //     }

//     //     return {
//     //         sortColumn: sortColumn,
//     //         sortOrder: sortInfo.desc ? FilterParamsSortingTypes.Descending : FilterParamsSortingTypes.Ascending
//     //     };
//     // }

//     public static columnSortOrderChanged(columnSortOrder: { [key: string]: { key: string; value: SortingTypes | string } }, columnKey: string, sortValue: SortingTypes | string): void {
//         Object.keys(columnSortOrder).forEach(key => {
//             if (columnSortOrder[key].key !== columnKey) {
//                 columnSortOrder[key].value = undefined;
//             } else {
//                 columnSortOrder[key].value = sortValue;
//             }
//         });
//     }
// }

export class DevExtremeValidationHelper {
    public static setValidationStatusIsPending(dxComponent: { instance: any }) {
        if (!dxComponent || !dxComponent.instance) {
            return;
        }
        //
        dxComponent.instance.option('validationStatus', 'pending');
    }

    public static setValidationStatusIsValid(dxComponent: { instance: any }) {
        if (!dxComponent || !dxComponent.instance) {
            return;
        }
        //
        dxComponent.instance.option('isValid', true);
        dxComponent.instance.option('validationStatus', 'valid');
    }

    // TODO: verify message error is not display after set option of component DevExtreme
    public static setValidationStatusIsInvalid(dxComponent: { instance: any }, errorMessage: string) {
        if (!dxComponent || !dxComponent.instance) {
            return;
        }
        //
        dxComponent.instance.option('isValid', false);
        dxComponent.instance.option('validationError', errorMessage ? errorMessage : 'This field is invalid');
    }
}

export class DxPopupHelper {
    public static disableDefaultEscapeEvent(params: { component: dxPopup }) {
        params.component.registerKeyHandler('escape', (event: Event) => {
            event.stopPropagation();
        });
    }
}
