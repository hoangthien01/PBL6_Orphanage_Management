import { ChildrenModel } from "@app/modules/children/models";

export class ChildRequestsResponseModel {
  current: string;
  page_size: string;
  page_number: number;
  count: number;
  results: ChildRequestModel[];

  public constructor(init?: Partial<ChildRequestsResponseModel>) {
      Object.assign(this, init);
  }
}

export class ChildRequestModel {
    id: string;
    children: ChildrenModel;
    created_at: Date;
    updated_at: Date;
    status: string;
    approver: string;
    adopter_name: string;
    adop_request_detail: string;

    public constructor(init?: Partial<ChildRequestModel>) {
        Object.assign(this, init);
    }
  }
