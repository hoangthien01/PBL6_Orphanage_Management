export class ActivityTypeModel {
  id: string;
  name: string;

  constructor(init?: Partial<ActivityTypeModel>) {
      Object.assign(this, init);
  }
}
