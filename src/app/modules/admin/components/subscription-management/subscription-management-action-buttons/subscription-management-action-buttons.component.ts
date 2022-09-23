import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DxPopoverComponent} from 'devextreme-angular/ui/popover';
//
import {
    svgIconPencil,
    svgIconDelete,
} from 'src/assets/images/svg-icons.constants';
import {AccountAssignmentModel} from '@app/modules/admin/models';

@Component({
    selector: 'app-subscription-management-action-buttons',
    templateUrl: './subscription-management-action-buttons.component.html',
    styleUrls: ['./subscription-management-action-buttons.component.scss']
})
export class SubscriptionManagementActionButtonsComponent {
    @ViewChild('popover', {static: true}) popover: DxPopoverComponent;

    @Input() position: string = 'bottom';
    @Input() width: string | number = 'auto';

    @Output() onHiding: EventEmitter<any> = new EventEmitter<any>();
    @Output() onHidden: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDelete: EventEmitter<{
        rowData: AccountAssignmentModel,
        rowIndex: number
    }> = new EventEmitter<{rowData: AccountAssignmentModel, rowIndex: number}>();

    SVG_ICONS = {
        Pencil: svgIconPencil.data,
        Delete: svgIconDelete.data,
    }

    selectedAccount: AccountAssignmentModel = new AccountAssignmentModel();
    selectedAccountRowIndex: number;

    constructor() {
    }

    show(target: any, data: {rowData: AccountAssignmentModel, rowIndex: number}) {
        this.selectedAccount = data.rowData;
        this.selectedAccountRowIndex = data.rowIndex;
        //
        this.popover.instance.show(target);
    }

    hide() {
        this.popover.instance.hide();
    }

    onPopoverShowing() {
        // fix rendering on the old target issue
        if (this.popover && this.popover.instance) {
            this.popover.instance.repaint();
        }
    }

    onPopoverHiding() {
        this.onHiding.emit();
    }

    onPopoverHidden() {
        this.onHidden.emit();
    }

    delete() {
        this.onDelete.emit({
            rowData: this.selectedAccount,
            rowIndex: this.selectedAccountRowIndex
        });
        //
        this.hide();
    }
}
