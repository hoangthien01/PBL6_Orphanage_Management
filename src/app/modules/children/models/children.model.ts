export class ChildrenModel {
  id: string;
  created_at: string;
  is_active: boolean;
  name: string;
  gender: number;
  identifier: string;
  age: number = 21;
  personal_picture: string;
  join_date: Date;
  updated_at: Date;
  status: string;

  public constructor(init?: Partial<ChildrenModel>) {
      Object.assign(this, init);
  }
}
