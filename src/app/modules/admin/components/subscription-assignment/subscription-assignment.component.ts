import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Key} from 'ts-keycode-enum';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import DataSource from 'devextreme/data/data_source';
import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import {DxLookupComponent} from 'devextreme-angular/ui/lookup';
//
import {ALLOWED_PAGE_SIZES} from '@app/shared/app.constants';
import {CommonFunction, AppNotify} from 'src/app/utilities';
import {AdminService} from '@app/modules/admin/services/admin.service';
import {SubscriptionPlanService} from '@app/modules/admin/services/subscription-plan.service';
// import {PaymentService} from '@app/modules/account-setting/services/payment.service';
import {SubscriptionPlanLookupModel} from '@app/modules/admin/models/subscription-plan-lookup.model';
import {SwitchingPlanModel} from '@app/modules/admin/models/switching-plan-model';
import {AccountAssignmentModel} from '@app/modules/admin/models';
import {SubscriptionManagementActionButtonsComponent} from '@app/modules/admin/components';

@Component({
    selector: 'app-subscription-assignment',
    templateUrl: './subscription-assignment.component.html',
    styleUrls: ['./subscription-assignment.component.scss']
})
export class SubscriptionAssignmentComponent implements OnInit, OnDestroy {
    @ViewChild('accountGrid') accountGrid: DxDataGridComponent;
    @ViewChild('basePlanLookup') basePlanLookup: DxLookupComponent;
    @ViewChild('actionButtonsComponent') actionButtonsComponent: SubscriptionManagementActionButtonsComponent;

    allowPageSizes = ALLOWED_PAGE_SIZES;

    dataSource: DataSource;
    totalCount: number = 0;
    searchKeyword = '';
    isPageSizeChange = false;
    selectedRows = [];
    sortColumn = 'createdAt';
    sortOrder = 1;
    subscriptionPlans: SubscriptionPlanLookupModel[] = [];
    columnSortOrder = {
        accountName: {key: 'accountName', value: undefined},
        identifierNumber: {key: 'identifierNumber', value: undefined},
        phoneNumber: {key: 'phoneNumber', value: undefined},
        email: {key: 'email', value: undefined},
        createdAt: {key: 'createdAt', value: undefined},
        subscriptionPlanId: {key: 'subscriptionPlanId', value: undefined},
    };
    updateDimensionInterval: any;
    selectedRowIdForOpeningActionsPopover: string;
    selectedAccount: AccountAssignmentModel = new AccountAssignmentModel();

    isInit: boolean = false;
    isGridLoading = false;
    isShowConfirmationPopup: boolean = false;
    planData: any;
    isResetTrialDays = false;
    isAssigningPlan = false;
    isShowDeleteAccountConfirmationPopup: boolean = false;

    searchKeywordSubject$: Subject<string> = new Subject<string>();
    subscription: Subscription = new Subscription();

    constructor(private subscriptionService: SubscriptionPlanService,
                // private paymentService: PaymentService,
                private adminService: AdminService) {
        this.subscription.add(this.searchKeywordSubject$.pipe(
            debounceTime(350),
            distinctUntilChanged()
        ).subscribe((searchKeyword) => {
            this.accountGrid.instance.refresh();
        }));
    }

    ngOnInit() {
        this.loadGridData();
        this.getSubscriptionPlans();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadGridData() {
        this.dataSource = new DataSource({
            key: 'accountId',
            load: (option) => this.gridLoadOption(option),
            onLoaded: () => {
                // Updates the content of widget after resizing.
                clearInterval(this.updateDimensionInterval);
                this.updateDimensionInterval = setInterval(() => {
                    clearInterval(this.updateDimensionInterval);
                    if (CommonFunction.allowUpdateDimensions(this.accountGrid.instance)) {
                        CommonFunction.executeUpdateDimensions(this.accountGrid.instance);
                    }
				}, 500);
			}
		});
	}

    getSubscriptionPlans() {
        this.subscriptionService.getListItemPlan().subscribe(res => {
            this.subscriptionPlans = res;
        });
    }

    assignPlanClicked(data, e) {
        const account = data.data;
        const oldSubscription = this.subscriptionPlans.find(_ => _.id === account.subscriptionPlanId);
        const newSubscription = e.itemData;
        if (oldSubscription.id === newSubscription.id) {
            return;
        }
        this.planData = {
            account: account,
            newSubscription: e.itemData,
            isChangeFromFreeSub: oldSubscription.isFree
        };
        this.isShowConfirmationPopup = true;
    }

    hideAssignPopup() {
        this.isShowConfirmationPopup = false;
        this.planData = null;
        this.isResetTrialDays = false;

        // TODO: Need to update by available data instead of call db.
        if (!this.isAssigningPlan) {
            this.accountGrid.instance.refresh();
        }
    }

    confirmAssigneePlan() {
        this.isAssigningPlan = true;
        const switchingPlanData = new SwitchingPlanModel({
            accountId: this.planData.account.accountId,
            newPlanId: this.planData.newSubscription.id,
            isResetTrialDays: this.isResetTrialDays
        });

        // this.paymentService.changeSubscription(switchingPlanData).subscribe().add(() => {
        //     this.isAssigningPlan = false;
        //     this.refreshGrid();
        // });
    }

	gridLoadOption(loadOptions) {
        if (!loadOptions.take) {
            return;
        }

        if (this.isPageSizeChange) {
            this.isPageSizeChange = false;
            loadOptions.skip = 0;
        }

        this.selectedRows = [];
        this.sortColumn = 'CreatedAt';
        this.sortOrder = -1;
        if (!!loadOptions.sort) {
            this.sortColumn = loadOptions.sort[0].selector.charAt(0).toUpperCase() + loadOptions.sort[0].selector.slice(1);
            if (!loadOptions.sort[0].desc) {
                this.sortOrder = 1;
            }
        }

        let params = {
            Skip: loadOptions.skip,
            Take: loadOptions.take,
            ColumnName: this.sortColumn,
            Keyword: this.searchKeyword,
            SortOrder: this.sortOrder,
        };
        this.isGridLoading = true;
        return this.adminService.getAccounts(params).toPromise()
            .finally(() => {
                if (!this.isInit) {
                    this.isInit = true;
                }
                //
                this.isGridLoading = false;
            })
            .then((res) => {
                this.totalCount = res.totalRecords;
                //
                return {
                    data: res.records,
                    totalCount: res.totalRecords
                };
            });
    }


    refreshGrid() {
        if (this.accountGrid && this.accountGrid.instance) {
            this.accountGrid.instance.refresh();
        }
    }

    searchTextBoxKeyPress(e) {
        if (e.event) {
            const isEcsClicked = CommonFunction.IsKeyCodeMatch(e.event, Key.Escape, 'Escape'); // ESC
            if (isEcsClicked && !!this.searchKeyword) { // ESC
                this.searchKeyword = '';
                this.refreshGrid();
                return;
            }
        }
    }

    onSortOrderChange(columnKey, sortValue) {
        Object.keys(this.columnSortOrder).forEach(key => {
            if (this.columnSortOrder[key].key !== columnKey) {
                this.columnSortOrder[key].value = undefined;
            } else {
                this.columnSortOrder[key].value = sortValue;
            }
        });
    }

	searchAccount(e) {
        this.searchKeywordSubject$.next(this.searchKeyword);
    }

    /**
     * Action Button
     */
     onToggleActionsButtonPopover(event: MouseEvent, rowData: AccountAssignmentModel, rowIndex: number) {
        if (this.selectedRowIdForOpeningActionsPopover === rowData.id) {
            this.actionButtonsComponent.hide();
            // set default
            this.selectedRowIdForOpeningActionsPopover = null;
        } else {
            this.selectedRowIdForOpeningActionsPopover = rowData.id;
            //
            if (this.actionButtonsComponent) {
                this.actionButtonsComponent.show(event.currentTarget, {
                    rowData: rowData,
                    rowIndex: rowIndex
                });
            }
        }
    }

    hideActionButtonPopover() {
        this.selectedRowIdForOpeningActionsPopover = null;
    }

    onDeleteAccountButtonClicked(params: {rowData: AccountAssignmentModel, rowIndex: number}) {
        this.selectedAccount = params.rowData;
        //
        this.isShowDeleteAccountConfirmationPopup = true;
    }

    onDeleteAccount() {
        if (!this.selectedAccount) {
            return;
        }
        //
        this.isGridLoading = true;
        this.adminService.deleteAccounts([this.selectedAccount.accountId]).subscribe((isSuccess: boolean) => {
            this.refreshGrid();
            AppNotify.success(AppNotify.generateSuccessMessage(
                `account “${this.selectedAccount.name} - ${this.selectedAccount.identifierNumber}”`,
                'deleted')
            );
        }, (error) => {
            this.isGridLoading = false;
        })

    }
}
