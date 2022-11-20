import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-home-overview-status',
  templateUrl: './overview-status.component.html',
  styleUrls: ['./overview-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOverviewStatusComponent {
    data = [
        {
            key: 'child',
            title: 'Trẻ',
            value: 100,
            rateString: 'hiện tại'
        },
        {
            key: 'employee',
            title: 'Nhân viên',
            value: 100,
            rateString: 'hiện tại'
        },
        {
            key: 'donor',
            title: 'Tổng số',
            value: 100,
            rateString: 'người ủng hộ'
        },
        {
            key: 'money',
            title: 'Tổng số',
            value: 100,
            rateString: 'tiền ủng hộ'
        },
    ];
}
