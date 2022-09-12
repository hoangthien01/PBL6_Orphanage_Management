export class GridColumnOrderModel {
    name: string;
    value: string;

    public constructor(init?: Partial<GridColumnOrderModel>) {
        Object.assign(this, init);
    }
}
