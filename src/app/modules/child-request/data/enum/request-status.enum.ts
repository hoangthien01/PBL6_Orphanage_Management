export enum RequestStatusEnum {
    Active = 0,
    Inactive = 1,
    Pending = 2,
}

export enum ChildRequestStatusEnum {
    Pending = 0,
    Approve,
    Reject,
    Cancel
  }