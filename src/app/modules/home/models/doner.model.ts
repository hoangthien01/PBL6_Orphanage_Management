export class ListDonerResponseModel {
  current: string;
  page_size: string;
  page_number: number;
  count: number;
  results: DonerModel[];

  public constructor(init?: Partial<ListDonerResponseModel>) {
      Object.assign(this, init);
  }
}

export class DonerModel {
    id: string;
    amount: number;
    created_at: string;
    note: string;
    donor: string;
    activity: string;

  public constructor(init?: Partial<DonerModel>) {
      Object.assign(this, init);
  }
}
