import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
//
import { BaseService } from '@app/core/services/base.service';
import * as ActivitiesActions from './activities.actions';
import { ActivityModel } from './../../../modules/client/models/activity.model';

export interface IActivitiesState {
    activities: ActivityModel[];
}

const INIT_STATE: IActivitiesState = {
  activities: [],
};

@State<IActivitiesState>({
    name: 'activities',
    defaults: INIT_STATE
})

@Injectable()
export class ActivitiesState {

    constructor(private baseService: BaseService) {
    }

    @Action(ActivitiesActions.setActivities)
    setActivities(context: StateContext<IActivitiesState>, { payload }: ActivitiesActions.setActivities) {

      context.patchState({
            activities: payload
        });
    }
}
