import {Selector} from '@ngxs/store';
//
import { IUserLookupState, UserLookupState } from '@app/core/store/user-lookup/user-lookup.state';

export class UserLookupSelectors {
    @Selector([UserLookupState])
    public static isInit(state: IUserLookupState): boolean {
        return state.isInit;
    }
}
