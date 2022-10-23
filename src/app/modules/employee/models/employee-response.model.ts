import { EmployeeModel } from "./employee.model";

export class ListEmployeeResponseModel {
  current: string;
  page_size: string;
  page_number: number;
  count: number;
  results: EmployeeModel[];

  public constructor(init?: Partial<ListEmployeeResponseModel>) {
      Object.assign(this, init);
  }
}
