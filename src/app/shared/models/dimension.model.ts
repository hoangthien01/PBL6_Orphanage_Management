export class DimensionModel {
    width: number;
    height: number;

    public constructor(init?: Partial<DimensionModel>) {
        Object.assign(this, init);
    }
}
