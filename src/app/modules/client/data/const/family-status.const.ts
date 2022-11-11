import { familyStatus } from "../enum/family-status.enum";

export const FAMILY_STATUS : {key: number, value: string}[] = [
    {
        key: familyStatus.Separately,
        value: 'Sống riêng',
    },
    {
        key: familyStatus.Together,
        value: 'Sống chung',
    },
];
