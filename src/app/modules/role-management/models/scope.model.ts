export class ScopeItemModel {
  scope: string;
  label: string;
  group: string;

  public constructor(init?: Partial<ScopeItemModel>) {
      Object.assign(this, init);
  }
}

export class ScopeModel {
  scope: string;
  label: string;
  children: ScopeItemModel[];

  public constructor(init?: Partial<ScopeItemModel>) {
      Object.assign(this, init);
  }
}
