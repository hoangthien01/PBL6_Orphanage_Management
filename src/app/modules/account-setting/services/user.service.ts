import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { DEVICE_TOKEN, PLATFORM_NAME } from '@app/core/store/user/user.storage';
import {
    ActivateAccountModel,
    ProfileGeneralInfoModel,
    RegisteredAccountModel,
    SignInModel,
} from '@app/modules/account-setting/models';
import {ListItemModel} from '@app/shared/models';
import {BaseService} from '@app/core/services/base.service';
import { AuthResultModel } from '@app/core/store/models';
import { SendInfoModel } from '@app/modules/client/models/send-info.model';

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
        return this.baseService.post(`user/action/login`, login, false);
    }

    register(registerAccount: RegisteredAccountModel): Observable<AuthResultModel> {
      const data = {
        name: registerAccount.name,
        email: registerAccount.email,
        password: registerAccount.password,
      }
      return this.baseService.post(`user/action/sign_up`, data, false);
    }

    reloadUserData(): Observable<AuthResultModel> {
      return this.baseService.post(`user/account/reload_page`, false);
    }

    autoLogin(activateModel: ActivateAccountModel): Observable<AuthResultModel> {
        return this.baseService.post(`user/auto-login`, activateModel);
    }

    forgotPassword(email: string): Observable<string> {
      const data = {
        email: email,
      }
        return this.baseService.post(`user/action/forgot_password`, data);
    }

    sendInfo(data?: SendInfoModel): Observable<string> {
        return this.baseService.post(`user/action/register_email`, data);
    }

    ////////////////////////////////

    checkingExistEmail(id: string, email: string): Observable<boolean> {
        const emailObj = new ListItemModel<string, string>();
        emailObj.key = id;
        emailObj.value = email;

        return this.baseService.post(`user/email/exists`, emailObj);
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
    //     const url = `user/avatar`;
    //     return this.baseService.postFile(url, avatar);
    // }

    // deleteAvatar(excludeConnectionId: string): Observable<boolean> {
    //     const avatar = new AvatarUpdatingModel();
    //     avatar.excludeConnectionId = excludeConnectionId;
    //     const url = `user/avatar/delete`;
    //     return this.baseService.post(url, avatar);
    // }

    // comparePassword(password: string): Observable<boolean> {
    //     const data = new SingleFieldModel<string>();
    //     data.data = password;
    //     const url = `user/password/compare`;
    //     return this.baseService.post(url, data);
    // }

    updatePassword(oldPassword: string, newPassword: string): Observable<boolean> {
        // const data = new ListItemModel<string, string>();
        // data.key = oldPassword;
        // data.value = newPassword;
        const data = {
          old_password: oldPassword,
          new_password: newPassword,
        }
        const url = `user/action/change_password`;
        return this.baseService.post(url, data);
    }

    // addUser(user: UserModel): Observable<string> {
    //     return this.baseService.post(`user`, user);
    // }

    // updateUser(user: UserModel): Observable<string> {
    //     return this.baseService.put(`user`, user);
    // }

    removeUser(userId: string, isDelete: boolean): Observable<boolean> {
        return this.baseService.delete(`user/${userId}/${isDelete ? 'true' : 'false'}`);
    }

    // getUser(userId: string): Observable<UserModel> {
    //     return this.baseService.get(`user/${userId}`);
    // }

    // getUsers(): Observable<UserModel[]> {
    //     return this.baseService.get(`user/users`);
    // }

    getUserAssigns(isUnassignInclude: boolean): Observable<ListItemModel<string, string>[]> {
        return this.baseService.get(`user/assignees?isUnassignInclude=${isUnassignInclude ? 'true' : 'false'}`);
    }

    getProspectGridColumnSetting(): Observable<string> {
        return this.baseService.get(`user/account/prospect-grid-column/setting`);
    }

    // switchAccount(accountId: string): Observable<AuthResultModel> {
    //     const switchAccount = new SwitchAccountModel();
    //     switchAccount.accountId = accountId;
    //     switchAccount.deviceToken = sessionStorage.getItem(DEVICE_TOKEN);
    //     switchAccount.platform = sessionStorage.getItem(PLATFORM_NAME) || 'iOS';

    //     return this.baseService.post(`user/switch`, switchAccount);
    // }

    // getUserByEmail(email: string): Observable<UserModel> {
    //     return this.baseService.get(`user/info/${email}`);
    // }

    // makeAsAccountOwner(userId: string): Observable<string> {
    //     const userObj = new SingleFieldModel<string>();
    //     userObj.data = userId;

    //     return this.baseService.put(`user/owner`, userObj);
    // }
}

