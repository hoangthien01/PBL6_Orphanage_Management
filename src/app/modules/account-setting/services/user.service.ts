import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { DEVICE_TOKEN, PLATFORM_NAME } from '@app/core/store/user/user.storage';
import {
    ActivateAccountModel,
    ProfileGeneralInfoModel,
    SignInModel,
} from '@app/modules/account-setting/models';
import {ListItemModel} from '@app/shared/models';
import {BaseService} from '@app/core/services/base.service';
import { AuthResultModel } from '@app/core/store/models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // Remove Later
    updateUserName: EventEmitter<string> = new EventEmitter<string>();
    updateUserAvatar: EventEmitter<string> = new EventEmitter<string>();
    private userURL = 'api/v1/user';
    private profileUserURL = 'api/user/profile';

    constructor(private baseService: BaseService) {
    }

    login(login: SignInModel): Observable<AuthResultModel> {
        return this.baseService.post(`${this.userURL}/action/login`, login, false);
    }

    autoLogin(activateModel: ActivateAccountModel): Observable<AuthResultModel> {
        return this.baseService.post(`${this.userURL}/auto-login`, activateModel);
    }

    // forgotPassword(email: string): Observable<string> {
        // const emailObj = new SingleFieldModel<string>();
        // emailObj.data = email;
        // return this.baseService.post(`${this.userURL}/reset`, emailObj);
    // }

    checkingExistEmail(id: string, email: string): Observable<boolean> {
        const emailObj = new ListItemModel<string, string>();
        emailObj.key = id;
        emailObj.value = email;

        return this.baseService.post(`${this.userURL}/email/exists`, emailObj);
    }


    getProfileGeneralInfo(): Observable<ProfileGeneralInfoModel> {
        const url = `${this.profileUserURL}/general-info`;
        return this.baseService.get(url);
    }

    updateProfileGeneralInfo(profile: ProfileGeneralInfoModel): Observable<boolean> {
        const url = `${this.profileUserURL}/general-info`;
        return this.baseService.put(url, profile);
    }

    // updateAvatar(file: any, excludeConnectionId: string): Observable<string> {
    //     const avatar = new AvatarUpdatingModel();
    //     avatar.data = file;
    //     avatar.excludeConnectionId = excludeConnectionId;
    //     const url = `${this.userURL}/avatar`;
    //     return this.baseService.postFile(url, avatar);
    // }

    // deleteAvatar(excludeConnectionId: string): Observable<boolean> {
    //     const avatar = new AvatarUpdatingModel();
    //     avatar.excludeConnectionId = excludeConnectionId;
    //     const url = `${this.userURL}/avatar/delete`;
    //     return this.baseService.post(url, avatar);
    // }

    // comparePassword(password: string): Observable<boolean> {
    //     const data = new SingleFieldModel<string>();
    //     data.data = password;
    //     const url = `${this.userURL}/password/compare`;
    //     return this.baseService.post(url, data);
    // }

    updatePassword(oldPassword: string, newPassword: string): Observable<boolean> {
        const data = new ListItemModel<string, string>();
        data.key = oldPassword;
        data.value = newPassword;
        const url = `${this.userURL}/password`;
        return this.baseService.put(url, data);
    }

    // addUser(user: UserModel): Observable<string> {
    //     return this.baseService.post(`${this.userURL}`, user);
    // }

    // updateUser(user: UserModel): Observable<string> {
    //     return this.baseService.put(`${this.userURL}`, user);
    // }

    removeUser(userId: string, isDelete: boolean): Observable<boolean> {
        return this.baseService.delete(`${this.userURL}/${userId}/${isDelete ? 'true' : 'false'}`);
    }

    // getUser(userId: string): Observable<UserModel> {
    //     return this.baseService.get(`${this.userURL}/${userId}`);
    // }

    // getUsers(): Observable<UserModel[]> {
    //     return this.baseService.get(`${this.userURL}/users`);
    // }

    getUserAssigns(isUnassignInclude: boolean): Observable<ListItemModel<string, string>[]> {
        return this.baseService.get(`${this.userURL}/assignees?isUnassignInclude=${isUnassignInclude ? 'true' : 'false'}`);
    }

    getProspectGridColumnSetting(): Observable<string> {
        return this.baseService.get(`${this.userURL}/account/prospect-grid-column/setting`);
    }

    // switchAccount(accountId: string): Observable<AuthResultModel> {
    //     const switchAccount = new SwitchAccountModel();
    //     switchAccount.accountId = accountId;
    //     switchAccount.deviceToken = sessionStorage.getItem(DEVICE_TOKEN);
    //     switchAccount.platform = sessionStorage.getItem(PLATFORM_NAME) || 'iOS';

    //     return this.baseService.post(`${this.userURL}/switch`, switchAccount);
    // }

    // getUserByEmail(email: string): Observable<UserModel> {
    //     return this.baseService.get(`${this.userURL}/info/${email}`);
    // }

    // makeAsAccountOwner(userId: string): Observable<string> {
    //     const userObj = new SingleFieldModel<string>();
    //     userObj.data = userId;

    //     return this.baseService.put(`${this.userURL}/owner`, userObj);
    // }
}

