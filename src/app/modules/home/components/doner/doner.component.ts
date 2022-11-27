import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LoadResultModel } from "@app/shared/models";
import { LoadOptions } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import { DonerModel } from "../../models/doner.model";
import { DonerService } from "../../services/doner.service";

@Component({
    selector: 'app-home-doner',
    templateUrl: './doner.component.html',
    styleUrls: ['./doner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDonerComponent implements OnInit{
    dataSource: DataSource;
    isLoading:boolean = false;
    //
    constructor(
        private donerService: DonerService,
        private changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loadGridData();
    }

    loadGridData() {
        this.dataSource = new DataSource({
            key: 'id',
            load: (option) => this.gridLoadOption(option),
        });
        this.isLoading = true;
    }

    gridLoadOption(loadOptions: LoadOptions): Promise<LoadResultModel<DonerModel[]>> {
        return this.donerService.getListEmployees().toPromise()
            .finally(() => {
                this.isLoading = false;
                this.changeDetector.detectChanges();
            })
            .then((res) => {
                return {
                    data: res.results,
                    totalCount: res.count
                };
            });
    }
}
