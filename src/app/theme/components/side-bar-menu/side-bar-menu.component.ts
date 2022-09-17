import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { animate, style, transition, trigger, state } from '@angular/animations';
import {Subscription} from 'rxjs';
import { filter } from 'rxjs/operators';
//
import {SideBarItemModel} from '@app/shared/models';
import { SideBarMenuType } from '@app/shared/app.enum';
import {
    svgIconWarningCircle,
    svgIconChevronDown
} from 'src/assets/images/svg-icons.constants';

type MenuNavigationType = 'routerLink' | 'withoutRouterLink' | 'both';

@Component({
    selector: 'app-side-bar-menu',
    templateUrl: './side-bar-menu.component.html',
    styleUrls: ['./side-bar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('expandCollapseAnimation', [
            state(
                'open',
                style({
                    height: '*',
                })
            ),
            state(
                'closed',
                style({
                    height: 0,
                })
            ),
            transition('open <=> closed', [
                animate('400ms ease')
            ])
        ]),
    ],
})

export class SideBarMenuComponent implements OnInit, OnDestroy {
    @Input() menu: SideBarItemModel[] = [];
    @Input() type: SideBarMenuType = SideBarMenuType.normal;
    @Input() tabSelected: SideBarItemModel = new SideBarItemModel();
    //
    @Input() disabled: boolean = false;
    // TODO: Refactor using MenuNavigationOptions
    @Input() isNavigateByRouterLink: boolean = true;
    private _isLeftMenuExpanded: boolean = true;

    @Input()
    get isLeftMenuExpanded(): boolean {
        return this._isLeftMenuExpanded;
    }

    set isLeftMenuExpanded(value: boolean) {
        this._isLeftMenuExpanded = value;
        //
        if (!value) {
            this.collapseParentMenuItems();
        }
        //
        this.isLeftMenuExpandedChange.emit(value);
    }
    // First application in Integration Component
    @Input() isApplyCanDeactiveForMenuWithoutRouterLink: boolean = false;

    /* eslint-disable @angular-eslint/no-output-on-prefix */
    @Output() isLeftMenuExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onNavigateSuccess: EventEmitter<void> = new EventEmitter<void>();
    @Output() onTabItemChanged: EventEmitter<{
        value: SideBarItemModel;
        previousValue: SideBarItemModel;
    }> = new EventEmitter<{value: SideBarItemModel; previousValue: SideBarItemModel}>();
    @Output() onLeftMenuExpanded: EventEmitter<void> = new EventEmitter<void>();

    SVG_ICONS = {
        warningCircle: svgIconWarningCircle.data,
        chevronDown: svgIconChevronDown.data,
    };
    SideBarMenuType = SideBarMenuType;

    currentUrl: string;

    private _subscription: Subscription = new Subscription();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.currentUrl = this._router.url;
        //
        if (this.isNavigateByRouterLink) {
            this._subscription.add(this._router.events.pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                this.currentUrl = this._router.url;
                this.navigateSuccess();
            }));
        } else {
            // switching tab, not navigate to url
            this.tabSelected = this.menu[0];
            this._changeDetectorRef.markForCheck();
        }
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /**
     * Event Handler
     */
    selectTab(tab: SideBarItemModel): void {
        if (this.disabled || !tab.visible || tab.disabled || this.tabSelected.key === tab.key) {
            return;
        }
        //
        this.onTabItemChanged.emit({
            previousValue: this.tabSelected,
            value: tab
        });
        //
        if (!this.isApplyCanDeactiveForMenuWithoutRouterLink) {
            this.tabSelected = tab;
        }
        //
        this._changeDetectorRef.markForCheck();
    }

    navigateSuccess() {
        this.onNavigateSuccess.emit();
        //
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Expand/Collapse Items
     */
    toggleParentMenuItem(parentTab: SideBarItemModel) {
        parentTab.isExpanded = !parentTab.isExpanded;
        // expand LeftMenu When Expanded ParentTab
        if (!!parentTab.isExpanded && !this.isLeftMenuExpanded) {
            this.isLeftMenuExpanded = true;
            //
            this.onLeftMenuExpanded.emit();
        }
        //
        this._changeDetectorRef.markForCheck();
    }

    collapseParentMenuItems() {
        this.menu.map((item) => {
            if (item.items && item.items.length > 0) {
                item.isExpanded = false;
            }
        });
        //
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Helper
     */
    trackByFn = (index) => index;

    isParentMenuItemActive = (currentUrl: string, parentRouterLink: string) => {
        if (!currentUrl || !parentRouterLink) {
            return false;
        }
        //
        return currentUrl.startsWith(parentRouterLink);
    };
}
