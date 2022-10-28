export class SendInfoModel {
  email: string;
  password: string;
  name: string;

  constructor(init?: Partial<SendInfoModel>) {
      Object.assign(this, init);
  }
}
