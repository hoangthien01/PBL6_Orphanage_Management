import { ActivityModel } from "@app/modules/activity/models/activity.model";

export enum ActivitiesActionType {
    SET_ACTIVITIES = '[Activities] set activities',
}

export class setActivities {
    static readonly type = ActivitiesActionType.SET_ACTIVITIES;

    constructor(public readonly payload: ActivityModel[]) {
    }
}

export type ActivitiesActions =
    | setActivities;
