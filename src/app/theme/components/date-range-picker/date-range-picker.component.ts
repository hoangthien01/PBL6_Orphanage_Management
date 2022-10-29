import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DaterangepickerComponent} from 'ng2-daterangepicker';
import {
    subDays,
    startOfISOWeek,
    endOfISOWeek,
    subWeeks,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfDay,
    endOfDay,
    differenceInDays,
    differenceInMonths
} from 'date-fns';
//
import {CAMPAIGN_TIME_UNIT} from '@app/shared/app.constants';
import {DateRangeTypes} from '@app/shared/app.enum';
import {svgIconCalendar, svgIconCloseWeight} from 'src/assets/images/svg-icons.constants';

type PositionType = 'left' | 'right' | 'center';
type DropsType = 'down' | 'up' | 'auto';

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
    @ViewChild('dateRangePicker') dateRangePicker: ElementRef;
    @ViewChild(DaterangepickerComponent) private picker: DaterangepickerComponent;

    _label: DateRangeTypes;
    @Input()
    get label() {
        return this._label || DateRangeTypes.AllTime;
    }

    set label(value: DateRangeTypes) {
        this._label = value;
        this.labelChange.emit(this._label);
    }

    _startDate: any;

    @Input()
    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
        this.startDateChange.emit(this.startDate);
    }

    _endDate: any;

    @Input()
    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
        this.endDateChange.emit(this.endDate);
    }

    @Input() isSmallButton: boolean = false;
    @Input() formatDate: string = 'd MMM y';
    @Input() isShowLabel: boolean = false;
    @Input() opens: PositionType = 'center';
    @Input() drops: DropsType = 'auto';
    @Input() parentEl: string;

    @Output() startDateChange = new EventEmitter<any>();
    @Output() endDateChange = new EventEmitter<any>();
    @Output() labelChange = new EventEmitter<any>();
    @Output() selectedDate = new EventEmitter<any>();
    @Output() showDateRangePicker = new EventEmitter<any>();
    @Output() hideDateRangePicker = new EventEmitter<any>();
    @Output() cancelDateRangePicker = new EventEmitter<any>();
    @Output() resetDateRangePicker = new EventEmitter<any>();
    @Output() events = new EventEmitter<any>();

    SVG_ICONS = {
        calendar: svgIconCalendar.data,
        closeWeight: svgIconCloseWeight.data
    };

    isActive = false;
    correctLabelInterval: any;

    dateRanges: { [key: string]: Date[] } = {
        [DateRangeTypes.Today]: [],
        [DateRangeTypes.LastSevenDays]: [],
        [DateRangeTypes.ThisWeek]: [],
        [DateRangeTypes.LastWeek]: [],
        [DateRangeTypes.ThisMonth]: [],
        [DateRangeTypes.LastMonth]: [],
        [DateRangeTypes.LastThreeMonths]: [],
        [DateRangeTypes.AllTime]: [],
    };

    constructor() {
        this.dateRanges = this.getDateRanges();
    }

    ngOnInit() {
    }

    getDateRanges(): { [key: string]: Date[] } {
        const currentDate: Date = new Date();
        const currentDayOfLastWeek: Date = subWeeks(currentDate, 1);
        const currentDayOfLastMonth: Date = subMonths(currentDate, 1);
        return {
            [DateRangeTypes.Today]: [currentDate, currentDate],
            [DateRangeTypes.LastSevenDays]: [startOfDay(subDays(currentDate, 7)), endOfDay(subDays(currentDate, 1))],
            [DateRangeTypes.ThisWeek]: [startOfISOWeek(currentDate), endOfISOWeek(currentDate)],
            [DateRangeTypes.LastWeek]: [startOfISOWeek(currentDayOfLastWeek), endOfISOWeek(currentDayOfLastWeek)],
            [DateRangeTypes.ThisMonth]: [startOfMonth(currentDate), currentDate],
            [DateRangeTypes.LastMonth]: [startOfMonth(currentDayOfLastMonth), endOfMonth(currentDayOfLastMonth)],
            [DateRangeTypes.LastThreeMonths]: [startOfMonth(subMonths(currentDate, 3)), endOfMonth(currentDayOfLastMonth)],
            [DateRangeTypes.AllTime]: []
        };
    }

    onApply(e: any) {
        this.label = e.picker.chosenLabel;
        if (e.picker.chosenLabel === 'All Time') {
            this.resetPicker(e.event, false);
            return;
        }
        this.events.emit(e);

        this.startDate = e.picker.startDate;
        this.endDate = e.picker.endDate;

        let unit = this.getTimeUnit(this.startDate, this.endDate);
        if (e.picker.chosenLabel === 'This Month' || e.picker.chosenLabel === 'Last Month') {
            unit = CAMPAIGN_TIME_UNIT.day;
        }
        const value = {
            start: this.startDate,
            end: this.endDate,
            timeUnit: unit
        };
        this.selectedDate.emit(value);
    }

    onShow(e) {
        this.isActive = true;
        this.label = this.label || DateRangeTypes.AllTime;
        this.resetSelection(this.label);
        this.showDateRangePicker.emit(e);
    }

    onHide(e) {
        this.isActive = false;
        this.hideDateRangePicker.emit(e);
        clearInterval(this.correctLabelInterval);
    }

    onCancel(e) {
        this.isActive = false;
        this.cancelDateRangePicker.emit(e);
    }

    resetPicker(e: Event, isClickResetButton: boolean = true) {
        if (isClickResetButton) {
            e.preventDefault();
            e.stopPropagation();
        }

        const now: Date = new Date();
        setTimeout(() => {
            this.picker.datePicker.setStartDate(now);
            this.picker.datePicker.setEndDate(now);
        });
        //
        this.startDate = undefined;
        this.endDate = undefined;
        this.label = DateRangeTypes.AllTime;
        this.resetDateRangePicker.emit(true);
    }

    resetSelection(label: DateRangeTypes) {
        const activeRangeElements = document.querySelectorAll('.ranges ul .active');
        if (activeRangeElements.length) {
            activeRangeElements[0].classList.remove('active');
            const element = document.querySelectorAll(`[data-range-key="${label}"]`)[0];
            element.classList.add('active');
        }
    }

    getTimeUnit(fromDate, toDate) {
        let unit = CAMPAIGN_TIME_UNIT.day;
        const days: number = differenceInDays(new Date(toDate), new Date(fromDate));
        const months: number = differenceInMonths(new Date(toDate), new Date(fromDate));

        if (months > 5) {
            unit = CAMPAIGN_TIME_UNIT.month;
        } else if (days > 30) {
            unit = CAMPAIGN_TIME_UNIT.week;
        }
        return unit;
    }
}
