import { ChildrenModel } from "@app/modules/children/models";

export class ChildRequestsResponseModel {
    current: string;
    page_size: string;
    page_number: number;
    count: number;
    results: ChildRequestModel[];

    public constructor(init?: Partial<ChildRequestsResponseModel>) {
        Object.assign(this, init);
    }
}

export class ChildRequestModel {
    id: string;
    children: ChildrenModel;
    created_at: Date;
    updated_at: Date;
    status: string;
    approver: string;
    adopter_name: string;
    adopt_request_detail: string;

    public constructor(init?: Partial<ChildRequestModel>) {
        Object.assign(this, init);
    }
}

export class ChildRequestDetailModel {
    id: string;
    adopter: {
        id: string,
        name: string,
        gender: 2,
        occupation: string,
        address: string,
        phone: string,
        email: string
    };
    created_at: string;
    income: string;
    marital_status: number;
    family_status: boolean;
    proof: [
        {
            id: string,
            link: string
        },
    ]

    public constructor(init?: Partial<ChildRequestDetailModel>) {
        Object.assign(this, init);
    }
}
