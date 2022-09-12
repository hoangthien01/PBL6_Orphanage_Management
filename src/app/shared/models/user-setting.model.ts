
export class AccountExperienceSettingModel {
    public prospectGridColumn: string;
    public pipelineId: string;
    //
    constructor(init?: Partial<AccountExperienceSettingModel>) {
        Object.assign(this, init);
    }
}

export class GridColumnBaseModel {
    orderIndex: number;
    width: number;
    isVisible: boolean;

    constructor(init?: Partial<GridColumnBaseModel>) {
        Object.assign(this, init);
    }
}

export class GridColumnItemModel extends GridColumnBaseModel {
    columnId: string;
    columnName: string;

    constructor(init?: Partial<GridColumnItemModel>) {
        super();
        Object.assign(this, init);
    }
}
