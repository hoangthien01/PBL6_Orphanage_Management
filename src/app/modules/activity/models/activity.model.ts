export class ActivityModel {
  id: string;
  title: string;
  content: string;
  location: string;
  start_date: string;
  created_at: string;
  donate: number;
  end_date: string;
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


