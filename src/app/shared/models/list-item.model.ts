export class ListItemModel<T1, T2> {
    key: T1;
    value: T2;
    abbreviatedValue?: string;
    groupBy?: string;
    visible?: boolean;
    disabled?: boolean;
    isDeleted?: boolean;
    isError?: boolean;

    public constructor(init?: Partial<ListItemModel<T1, T2>>) {
        Object.assign(this, init);
    }
}

export class ItemModel<T> extends ListItemModel<string, T> {

}

export class ItemBaseModel {
    id: string;
    name: string;
    groupBy?: string;
    visible?: boolean;
    disabled?: boolean;
    isError?: boolean;
    isDeleted?: boolean;

    constructor(init?: Partial<ItemBaseModel>) {
        Object.assign(this, init);
    }
}

export class CampaignItemModel extends ListItemModel<string, string> {
    isSendingStopped: boolean = false;

    constructor(init?: Partial<CampaignItemModel>) {
        super();
        Object.assign(this, init);
    }
}

export class AssigneeLookupItemModel extends ListItemModel<string, string> {
    avatarFileKey: string;

    constructor(init?: Partial<CampaignItemModel>) {
        super();
        Object.assign(this, init);
    }
}

export class ProspectLookupItemModel extends ListItemModel<string, string> {
    isDoNotContactEnabled: boolean = false;

    constructor(init?: Partial<ProspectLookupItemModel>) {
        super();
        Object.assign(this, init);
    }
}
