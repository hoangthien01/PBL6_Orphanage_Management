
export class ProfileGeneralInfoModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    avatar: string;

    public constructor(init?: Partial<ProfileGeneralInfoModel>) {
        Object.assign(this, init);
    }
}
