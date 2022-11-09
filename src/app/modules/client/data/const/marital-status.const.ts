import { maritalStatus } from "../enum/marital-status.enum";

export const MARITAL_STATUS : {key: number, value: string}[] = [
    {
        key: maritalStatus.Single,
        value: 'Độc thân',
    },
    {
        key: maritalStatus.Couple,
        value: 'Đã kết hôn',
    },
    {
        key: maritalStatus.Other,
        value: 'Khác',
    },
];
