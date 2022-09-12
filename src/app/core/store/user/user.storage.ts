import { AppStorage, DateHelper } from '@app/utilities';
import { PermissionModel } from '@app/shared/models';
import { environment } from '@environment';
import { AppEnvironments } from '@app/shared/app.enum';

export const USER_ACCESS_TOKEN = '_ws_atk';
export const USER_ID = '_ws_uid';
export const TWILIO_CAPABILITY_TOKEN = '_ws_tct';
export const USER_PERMISSIONS = '_ws_ups';
export const USER_EXPERIENCE_SETTINGS = '_ws_userExperienceSettings';
export const CUSTOM_FIELDS_SETTINGS = '_ws_customFieldsSetting';
export const ACCOUNT_ID = '_ws_aid';
export const ACCOUNT_TIMEZONE = '_ws_atz';
export const ACCOUNT_EXPERIENCE_SETTINGS = '_ws_accountExperienceSettingsOfThisUser';
//
export const DEVICE_TOKEN = '_ws_deviceToken';
export const PLATFORM_NAME = '_ws_platform';

export class UserStorage {
    public static accountIdsCanAccessPipelineFeature: string[] = [];

    //#region User Info
    public static getUserId() {
        return sessionStorage.getItem(USER_ID);
    }

    public static isLoggedIn(): boolean {
        return (!!sessionStorage.getItem(USER_ACCESS_TOKEN) && !!localStorage.getItem(USER_ACCESS_TOKEN) && this.isSameUser());
    }

    public static isSameUser(): boolean {
        const userIdFromLocalStorage: string = localStorage.getItem(USER_ID);
        const userIdFromSessionStorage: string = sessionStorage.getItem(USER_ID);
        return userIdFromLocalStorage && userIdFromSessionStorage && (userIdFromLocalStorage === userIdFromSessionStorage);
    }

    public static getUserPermissions(): PermissionModel[] {
        return AppStorage.getStorageValue({
            storage: 'session',
            key: USER_PERMISSIONS,
            valueType: 'array',
            isDecode: true
        });
    }
    //#endregion

    //#region Account Info
    public static getAccountId(): string {
        return sessionStorage.getItem(ACCOUNT_ID);
    }

    public static getTwilioCapabilityToken(): string {
        return AppStorage.getStorageValue({
            storage: 'session',
            key: TWILIO_CAPABILITY_TOKEN,
            valueType: 'string',
            isDecode: true
        });
    }
    //#endregion

    //#region Timezone
    public static getAccountTimezone(): string {
        try {
            const timezoneString: string = sessionStorage.getItem(ACCOUNT_TIMEZONE);
            const accountTimezone: { timezone: string; timezoneIana: string } = JSON.parse(timezoneString);
            return typeof accountTimezone === 'object' ? accountTimezone.timezone : '';
        } catch {
            return '';
        }
    }

    public static getAccountTimezoneIana(): string {
        try {
            const timezoneString: string = sessionStorage.getItem(ACCOUNT_TIMEZONE);
            const accountTimezone: { timezone: string; timezoneIana: string } = JSON.parse(timezoneString);
            return typeof accountTimezone === 'object' ? accountTimezone.timezoneIana : '';
        } catch {
            return '';
        }
    }

    public static convertDateToAccountZonedDateTime(date: Date | number | string): Date {
        return DateHelper.convertUtcToZonedDateTime(date, UserStorage.getAccountTimezoneIana());
    }

    public static convertDateToAccountZonedDateTimeAndFormat(date: Date | number | string, format: string): string {
        const timezoneIana: string = UserStorage.getAccountTimezoneIana();
        const zonedDateTime: Date = DateHelper.convertUtcToZonedDateTime(date, timezoneIana);
        return DateHelper.formatZonedDateTime(zonedDateTime, timezoneIana, format);
    }

    public static convertAccountZonedDateTimeToISOString(date: Date | number | string): string {
        const utcDateTime: Date = DateHelper.convertZonedDateTimeToUtc(date, UserStorage.getAccountTimezoneIana());
        return DateHelper.convertToISOString(utcDateTime);
    }

    public static convertLocalDateTimeToISOStringOfAccountZonedDateTime(date: Date | number | string): string {
        const accountZonedDateTime: Date = UserStorage.convertDateToAccountZonedDateTime(date);
        return UserStorage.convertAccountZonedDateTimeToISOString(accountZonedDateTime);
    }
    //#endregion

    //#region
    public static removeSessionStorage(): void {
        sessionStorage.clear();
    }

    public static removeLocalStorage(): void {
        localStorage.clear();
    }

    public static syncSessionStorageToLocalStorage() {
        localStorage.setItem(USER_ACCESS_TOKEN, sessionStorage.getItem(USER_ACCESS_TOKEN));
        localStorage.setItem(USER_ID, sessionStorage.getItem(USER_ID));
        localStorage.setItem(TWILIO_CAPABILITY_TOKEN, sessionStorage.getItem(TWILIO_CAPABILITY_TOKEN));
        localStorage.setItem(USER_PERMISSIONS, sessionStorage.getItem(USER_PERMISSIONS));
    }
    //#endregion

    //#region Available AccountIds For Pipeline Feature
    public static storeAccountIdsCanAccessPipelineFeature(accountIds?: string[]) {
        if (!accountIds || !Array.isArray(accountIds) || !accountIds.length) {
            this.accountIdsCanAccessPipelineFeature = [];
            return;
        }
        //
        this.accountIdsCanAccessPipelineFeature = accountIds;
    }

    public static isAccountIdCanAccessPipelineFeature() {
        return environment.name === AppEnvironments.Prod
            ? this.accountIdsCanAccessPipelineFeature.includes(UserStorage.getAccountId())
            : true;
    }
    //#endregion
}
