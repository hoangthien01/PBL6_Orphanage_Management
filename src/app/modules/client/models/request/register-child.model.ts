import { familyStatus } from "../../data/enum/family-status.enum";
import { maritalStatus } from "../../data/enum/marital-status.enum";

export class RegisterChildRequestModel {
    income: number;
    marital_status: maritalStatus = maritalStatus.Single;
    family_status: familyStatus = familyStatus.Separately;
    proofs: any[];

    constructor(init?: Partial<RegisterChildRequestModel>) {
        Object.assign(this, init);
    }
  }
