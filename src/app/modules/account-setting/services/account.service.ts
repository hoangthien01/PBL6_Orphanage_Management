import { EventEmitter, Injectable } from '@angular/core';
//
import { NotificationType } from '@app/shared/app.enum';

import { BaseService } from '@app/core/services';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private accountURL = 'api/account';

    hideLeftSettingMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
    updateCompanyName: EventEmitter<string> = new EventEmitter<string>();
    updateHeaderNotification: EventEmitter<NotificationType> = new EventEmitter<NotificationType>();
    refreshHeaderNotification: EventEmitter<boolean> = new EventEmitter<boolean>();
    authErrorMessage: EventEmitter<string> = new EventEmitter<string>();

    constructor(private baseService: BaseService) {
    }

    toggleSettingMenu(hide: boolean): void {
        setTimeout(() => {
            this.hideLeftSettingMenu.emit(hide);
        }, 100);
    }

    // register(registerAccount: RegisteredAccountModel): Observable<ActivateAccountModel> {
    //     return this.baseService.post(`${this.accountURL}/register`, registerAccount, false);
    // }

    //#region Phone Numbers
    // getPhoneNumbers(): Observable<CompanyPhoneNumberGridModel[]> {
    //     return this.baseService.get(`${this.accountURL}/numbers`);
    // }

    // searchPhoneNumber(countryCode: string, areaCode: string): Observable<PhoneNumberResultModel[]> {
    //     return this.baseService.get(`${this.accountURL}/numbers/find?countryCode=${countryCode}&areaCode=${areaCode}`);
    // }

    // searchNearPhoneNumber(countryCode: string, phoneNumber: string): Observable<PhoneNumberResultModel[]> {
    //     return this.baseService.get(`${this.accountURL}/numbers/near/find?countryCode=${countryCode}&phoneNumber=${phoneNumber}`);
    // }

    // checkPhoneNumberExists(): Observable<boolean> {
    //     return this.baseService.get(`${this.accountURL}/numbers/exists`);
    // }

    // purchaseNumber(numbers: PurchasePhoneNumberModel): Observable<any> {
    //     return this.baseService.post(`${this.accountURL}/numbers`, numbers);
    // }

    // updatePhoneNumber(companyPhoneNumber: CompanyPhoneNumberGridModel | CompanyPhoneNumberModel, updateType: string): Observable<boolean> {
    //     return this.baseService.put(`${this.accountURL}/numbers?updateType=${updateType}`, companyPhoneNumber);
    // }

    // deletePhoneNumber(id: string, replacementNumberId?: string): Observable<boolean> {
    //     return this.baseService.delete(`${this.accountURL}/numbers/${id}${replacementNumberId ? '?replacementNumberId=' + replacementNumberId : ''}`);
    // }

    // deletePhoneNumberOnBoarding(id: string): Observable<boolean> {
    //     return this.baseService.delete(`${this.accountURL}/on-boarding/numbers/${id}`);
    // }
    // //#endregion

    // //#region API Keys
    // getKeys(): Observable<ListItemModel<string, string>> {
    //     return this.baseService.get(`${this.accountURL}/keys`);
    // }
    // //#endregion

    // //#region Account Info
    // getAccountInfo(): Observable<AccountInfoSettingModel> {
    //     return this.baseService.get(`${this.accountURL}/info`);
    // }

    // updateAccountInfo(accountInfo: AccountInfoSettingModel): any {
    //     return this.baseService.put(`${this.accountURL}/info`, accountInfo);
    // }

    // getAccountEmail(): Observable<AccountEmailModel> {
    //     return this.baseService.get(`${this.accountURL}/email`);
    // }
    //#endregion Account Info

    //#region A2P-10DLC
    // resubmitBusinessProfile(): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/a2p-10dlc/campaign/resubmit`, {});
    // }

    // submitBusinessProfileStater(accountInfoStarterProfile: BusinessProfileStarterModel): Observable<{ isSubmitted: boolean; failureReason: string }> {
    //     return this.baseService.post(`${this.accountURL}/a2p-brand/starter`, accountInfoStarterProfile);
    // }

    // getBusinessProfileStatus(): Observable<BusinessProfileModel> {
    //     return this.baseService.get(`${this.accountURL}/a2p-brand/status`);
    // }

    // getBusinessProfileDetail(): Observable<BusinessProfileDetailModel> {
    //     return this.baseService.get(`${this.accountURL}/a2p-brand/detail`);
    // }

    // // Business profile standard
    // submitBusinessProfileStandard(standardBusinessProfile: BusinessProfileStandardModel): Observable<{ isSubmitted: boolean; failureReason: string }> {
    //     return this.baseService.post(`${this.accountURL}/a2p-brand/standard`, standardBusinessProfile);
    // }

    // getAccountNotification(): Observable<AccountNotificationModel> {
    //     return this.baseService.get(`${this.accountURL}/a2p-10dlc/notifications`);
    // }

    // getDailySMSInLast30Days(): Observable<ListItemModel<string, number>[]> {
    //     return this.baseService.get(`${this.accountURL}/a2p-10dlc/messages`);
    // }
    // //#endregion

    // updateAccountEmail(accountEmail: AccountEmailModel): Observable<boolean> {
    //     // Update signature file inline
    //     const base64Images = RegexObject.extractBase64Image(accountEmail.signature);
    //     if (base64Images) {
    //         base64Images.forEach(base64Image => {
    //             const file = CommonFunction.base64ToFile(base64Image, null);
    //             accountEmail.signature = RegexObject.replaceBase64ToCid(accountEmail.signature, base64Image, file.name);
    //             if (!accountEmail.signatureInlineImages) {
    //                 accountEmail.signatureInlineImages = [];
    //             }
    //             accountEmail.signatureInlineImages.push(file);
    //         });
    //     }

    //     return this.baseService.putFile(`${this.accountURL}/email`, accountEmail);
    // }

    // addAccount(addAccount: AddManagedAccount): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/manage`, addAccount);
    // }

    // getManageAccount(): Observable<ManagedAccount[]> {
    //     return this.baseService.get(`${this.accountURL}/manage`);
    // }

    // approveRequest(params: any): Observable<string> {
    //     const data = {
    //         requestUserId: params.requestUserId,
    //         approvalUserId: params.approvalUserId,
    //         verificationToken: params.token,
    //         approvalAccountId: params.approvalAccountId
    //     };

    //     return this.baseService.put(`${this.accountURL}/manage/link`, data);
    // }

    // requestAccess(accountNumber: string) {
    //     const accountNumberObj = new SingleFieldModel<string>();
    //     accountNumberObj.data = accountNumber;

    //     return this.baseService.post(`${this.accountURL}/manage/link`, accountNumberObj);
    // }

    // saveToken(stripeToken): Observable<string> {
    //     return this.baseService.post(`${this.accountURL}/card`, stripeToken);
    // }

    // unlink(accountNumber: string) {
    //     const unlinkUser = new SingleFieldModel<string>();
    //     unlinkUser.data = accountNumber;
    //     return this.baseService.post(`${this.accountURL}/manage/unlink`, unlinkUser);
    // }

    // getAccountSubscription(): Observable<AccountSubscriptionModel> {
    //     return this.baseService.get(`${this.accountURL}/subscription`);
    // }

    // getCallsHistory(params: SearchParamBaseModel): Observable<GridBaseModel<PhoneCallHistoryModel[]>> {
    //     // TODO: [BE] need to refactor code BE later
    //     const queryParams = [
    //         `skip=${params.skip}`,
    //         `take=${params.take}`,
    //         `sortColumn=${params.sortColumn}`,
    //         `sortType=${params.sortType}`,
    //         `keyword=${params.keyword}`,
    //     ];
    //     return this.baseService.get(`${this.accountURL}/call-history?${queryParams.join('&')}`);
    // }

    // updateOnboarded(): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/onboarded`, {});
    // }

    // updateAccountSubscriptionStatus(isCancel: boolean): Observable<boolean> {
    //     const url = isCancel ? `${this.accountURL}/subscription/cancel` : `${this.accountURL}/subscription/reuse`;
    //     return this.baseService.post(url, {});
    // }

    // getCurrentSubscription(): Observable<any> {
    //     return this.baseService.get(`${this.accountURL}/subscription/current`);
    // }

    // //#region Tags Management
    // getTagItems(): Observable<TagItemModel[]> {
    //     return this.baseService.get(`${this.accountURL}/tag-item`);
    // }

    // getTagItem(tagId: string): Observable<TagItemModel> {
    //     return this.baseService.get(`${this.accountURL}/${tagId}`);
    // }

    // addTagItem(tag: TagItemModel): Observable<string> {
    //     return this.baseService.post(`${this.accountURL}/tag-item`, tag);
    // }

    // updateTagItem(tag: TagItemModel): Observable<boolean> {
    //     return this.baseService.put(`${this.accountURL}`, tag);
    // }

    // removeTagItem(id: string): Observable<boolean> {
    //     return this.baseService.delete(`${this.accountURL}/${id}`);
    // }

    // checkEmailIsInvalid(domain: string): Observable<boolean> {
    //     return this.baseService.get(`${this.accountURL}/email/check-valid/${encodeURIComponent(domain)}`);
    // }

    // deauthenticateDomain(): Observable<boolean> {
    //     return this.baseService.delete(`${this.accountURL}/domain`);
    // }

    // updateZapierSetting(prospectStatuses: string[]): Observable<boolean> {
    //     return this.baseService.put(`${this.accountURL}/lead-status`, prospectStatuses);
    // }

    // getZapierSetting(): Observable<string[]> {
    //     return this.baseService.get(`${this.accountURL}/lead-status`);
    // }

    // createMessageTemplate(template: MessageTemplateModel): Observable<string> {
    //     return this.baseService.postFile(`${this.accountURL}/message-templates`, template);
    // }

    // updateMessageTemplate(template: MessageTemplateModel): Observable<boolean> {
    //     return this.baseService.putFile(`${this.accountURL}/message-templates`, template);
    // }

    // getMessageTemplates(params: SearchParamBaseModel): Observable<GridBaseModel<MessageTemplateModel[]>> {
    //     const queryParams: string = ObjectHelper.convertToQueryParams(params);
    //     return this.baseService.get(`${this.accountURL}/message-templates?${queryParams}`);
    // }

    // getMessageTemplate(id: string): Observable<MessageTemplateModel> {
    //     return this.baseService.get(`${this.accountURL}/message-template/${id}`);
    // }

    // getMessageTemplatesForPicker(): Observable<any> {
    //     return this.baseService.get(`${this.accountURL}/message-templates/for-picker`);
    // }

    // deleteMessageTemplates(ids: string[]): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/message-templates/delete`, ids);
    // }

    // deleteAllTemplates(): Observable<boolean> {
    //     return this.baseService.delete(`${this.accountURL}/message-templates/all`);
    // }

    // duplicateMessageTemplates(data: DuplicationData): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/message-templates/duplicate`, data);
    // }
    //#endregion

    //#region Custom Fields
    // getCustomFields(): Observable<CustomFieldModel[]> {
    //     return this.baseService.get(`${this.accountURL}/custom-fields`);
    // }

    // deleteCustomFields(customFieldIds: string[], webSocketConnectionId: string): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/custom-fields/delete?webSocketConnectionId=${webSocketConnectionId}`, customFieldIds);
    // }

    // createCustomField(customField: CustomFieldModel, webSocketConnectionId: string): Observable<CustomFieldModel> {
    //     return this.baseService.post(`${this.accountURL}/custom-fields?webSocketConnectionId=${webSocketConnectionId}`, customField);
    // }

    // updateCustomField(customField: CustomFieldModel, webSocketConnectionId: string): Observable<CustomFieldModel> {
    //     return this.baseService.put(`${this.accountURL}/custom-fields?webSocketConnectionId=${webSocketConnectionId}`, customField);
    // }

    // getDeletedCustomFields(): Observable<DeletedCustomFieldModel[]> {
    //     return this.baseService.get(`${this.accountURL}/custom-fields/delete`);
    // }

    // restoreCustomFields(customFieldIds: string[], webSocketConnectionId: string): Observable<CustomFieldModel[]> {
    //     return this.baseService.put(`${this.accountURL}/custom-fields/restore?webSocketConnectionId=${webSocketConnectionId}`, customFieldIds);
    // }

    // deletePermanentlyCustomFields(customFieldIds: string[]): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/custom-fields/delete-permanently`, customFieldIds);
    // }
    //#endregion

    //#region Webhooks Setting
    // getWebhooksSetting(): Observable<WebhooksSettingModel[]> {
    //     return this.baseService.get(`${this.accountURL}/webhook`);
    // }

    // updateWebhookSetting(updatedWebhookItem: WebhooksSettingModel[]): Observable<boolean> {
    //     return this.baseService.post(`${this.accountURL}/webhook`, {
    //         data: updatedWebhookItem
    //     });
    // }
    //#region

    //#region Woo Response Setting
    // getWooResponseLibraryErrorInfo(): Observable<WooResponseLibraryErrorModel> {
    //     return this.baseService.get(`${this.accountURL}/wooresponse/error-info`);
    // }

    // endAccountTrial(): Observable<boolean> {
    //     return this.baseService.get(`${this.accountURL}/trial/end`);
    // }
    //#endregion
}
