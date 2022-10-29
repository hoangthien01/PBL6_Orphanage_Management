import { ActivityModel } from '../../../modules/activity/models/activity.model';
import {Selector} from '@ngxs/store';
//
import { ActivitiesState, IActivitiesState } from './activities.state';

export class ActivitiesSelectors {
    @Selector([ActivitiesState])
    public static activities(state: IActivitiesState): ActivityModel[] {
        return state.activities;
    }
}
