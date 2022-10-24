export class EmployeeModel {
  id: string;
  is_active: boolean;
  name: string;
  age: number = 21;
  address: string;
  avatar: string;
  birthday:string;
  created_at: string;
  gender: number;
  is_vip_donor: boolean;
  occupation: string;
  personal_email: string;
  updated_at: Date;

  public constructor(init?: Partial<EmployeeModel>) {
      Object.assign(this, init);
  }
}