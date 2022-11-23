import { ChildRequestStatusEnum } from "../enum/request-status.enum";

export const CHILD_REQUEST_STATUS : {key: number, value: string}[] = [
    {
        key: ChildRequestStatusEnum.Pending,
        value: 'Chờ phản hồi',
    },
    {
        key: ChildRequestStatusEnum.Cancel,
        value: 'Đã hủy',
    },
    {
        key: ChildRequestStatusEnum.Approve,
        value: 'Đã xác nhận',
    },
    {
        key: ChildRequestStatusEnum.Reject,
        value: 'Đã từ chối',
    },
];
