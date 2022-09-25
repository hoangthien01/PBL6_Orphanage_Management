export class RoleModel {
  id: String;
  created_at: String;
  updated_at:String;
  is_active: boolean;
  name: String;
  scope_text:String;
  description:String;
  last_modified_by: String

  public constructor(init?: Partial<RoleModel>) {
      Object.assign(this, init);
  }
}

export class ListRolesModel {
  links: {
    previous: string;
    next: string;
  }
  current: number;
  page_size: number;
  page_number: number;
  count: number;
  results: RoleModel[];

  public constructor(init?: Partial<RoleModel>) {
      Object.assign(this, init);
  }
}
