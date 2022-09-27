export class ChildrenModel {
  id: string;
  created_at: string;
  is_active: boolean;
  name: string;
  gender: number;
  age: number
  personal_picture: string;
  join_date: Date;
  status: string;

  public constructor(init?: Partial<ChildrenModel>) {
      Object.assign(this, init);
  }
}
