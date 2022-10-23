export class ActivityModel {
  id: string;
  title: string;
  content: string;
  location: string;
  start_date: Date;
  created_at: Date;
  end_date: Date;
  cover_picture: string;
  expense: string;
  activity_type: string;

  constructor(init?: Partial<ActivityModel>) {
      Object.assign(this, init);
  }
}

export class ActivityResponseModel {
  results: ActivityModel[];
  current: number;
  page_number: number;
  page_size: number;
  count: number;

  constructor(init?: Partial<ActivityResponseModel>) {
      Object.assign(this, init);
  }
}
