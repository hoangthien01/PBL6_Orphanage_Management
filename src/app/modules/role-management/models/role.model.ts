export class RoleModel {
  id: string;
  created_at: string;
  updated_at:string;
  is_active: boolean;
  name: string;
  scope_text:string;
  description:string;
  last_modified_by: string

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
