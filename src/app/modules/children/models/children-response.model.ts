import { ChildrenModel } from "./children.model";

export class ListChildrenResponseModel {
  links: {
    previous: string,
    next: string
  };
  current: string;
  page_size: string;
  page_number: number;
  count: number;
  results: ChildrenModel[];

  public constructor(init?: Partial<ListChildrenResponseModel>) {
      Object.assign(this, init);
  }
}
