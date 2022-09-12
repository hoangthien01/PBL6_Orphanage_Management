export class GridBaseModel<T> {
    records: T;
    totalRecords: number;
    totalErrors?: number;

    constructor(init?: Partial<GridBaseModel<T>>) {
        Object.assign(this, init);
    }
}

export class LoadResultModel<T> {
    data: T;
    totalCount: number;

    constructor(init?: Partial<LoadResultModel<T>>) {
        Object.assign(this, init);
    }
}
