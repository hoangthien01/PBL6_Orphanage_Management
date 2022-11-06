export const ENDPOINTS = {
    // Admin
    ADMIN: '/admin',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_SUBSCRIPTION_PLAN: '/admin/subscription-plan',
    ADMIN_SUBSCRIPTION_ASSIGNMENT: '/admin/subscription-assignment',

    // Client
    LOGIN: 'auth/login',
    SIGN_UP: '/sign-up-now',
    FORGOT_PASSWORD: 'auth/forgot-password',
    SWITCH_ACCOUNT: '/switch-account',
    FORBIDDEN: '/forbidden',

    // Onboarding
    ONBOARDING: '/onboarding',

    // Conversation Module
    CONVERSATION: '/conversations',
    CONVERSATION_CUSTOM_INFO: '/conversations/custom-info',

    // Contacts
    CONTACTS: '/contacts',
    CONTACTS_IMPORT: '/contacts/import',
    CONTACTS_CUSTOM_INFO: '/contacts/custom-info',
    //
    CONTACTS_ACTIVE: '/contacts',
    CONTACTS_DELETED: '/contacts/deleted',

    //Manage role
    MANAGE_ROLE_PAGE: 'admin/manage-role',

    // Account Setting
    SETTING: '/setting',
    SETTING_EMAIL: '/setting/email',
    SETTING_NUMBER: '/setting/number',
    SETTING_BILLING: '/setting/billing',
    SETTING_BILLING_CARD: '/setting/billing/card',
    SETTING_BILLING_INVOICES: '/setting/billing/invoices',
    SETTING_BILLING_SUBSCRIPTION: '/setting/billing/subscription',
    SETTING_API_KEYS: '/setting/api',
    SETTING_USERS: '/setting/user',
    SETTING_PHONE_CALL_HISTORY: '/setting/call-history',
    //
    SETTING_ACCOUNT_INFO: '/setting/info',
    SETTING_ACCOUNT_INFO_BUSINESS_PROFILE: '/setting/info/business-profile',
    //
    SETTING_WOO_RESPONSE_LIBRARIES: '/setting/woo-response-libraries',
    SETTING_WOO_RESPONSE_LIBRARIES_ACTIVE: '/setting/woo-response-libraries/active',
    SETTING_WOO_RESPONSE_LIBRARIES_DELETED: '/setting/woo-response-libraries/deleted',
    //
    SETTING_PIPELINES: '/setting/pipelines',
    SETTING_PIPELINES_ACTIVE: '/setting/pipelines/active',
    SETTING_PIPELINES_DELETED: '/setting/pipelines/deleted',
    //
    SETTING_PRODUCTS: '/setting/products',
    SETTING_PRODUCTS_ACTIVE: '/setting/products/active',
    SETTING_PRODUCTS_DELETED: '/setting/products/deleted',
    //
    SETTING_TAGS: '/setting/tags',
    SETTING_MESSAGE_TEMPLATES: '/setting/message-templates',
    SETTING_CUSTOM_INFO: '/setting/custom-info',
    //
    SETTING_FACEBOOK_INTEGRATION: '/setting/facebook-integration',
    SETTING_FACEBOOK_INTEGRATION_INFO: '/setting/facebook-integration/info',
    //
    SETTING_WEBHOOKS: '/setting/webhooks',
    SETTING_OTHERS: '/setting/others',
    //
    SETTING_LIVE_CHAT: '/setting/chatbox',
    //
    SETTING_APPOINTMENT: '/setting/appointment',
    SETTING_APPOINTMENT_CONFIRMATION: '/setting/appointment/appointment-confirmation',
    SETTING_APPOINTMENT_REMINDER: '/setting/appointment/appointment-reminder',
    SETTING_APPOINTMENT_CALENDAR_INVITE: '/setting/appointment/calendar-invite',
    //
    PROFILE: 'admin/profile',
    SETTING_PROFILE: '/setting/profile',
    SETTING_PROFILE_GENERAL_INFO:'/setting/profile/general-info',
    SETTING_PROFILE_AVAILABILITY:'/setting/profile/availability',
    SETTING_PROFILE_NOTIFICATION:'/setting/profile/notification',

    // Manage Account
    MANAGE_ACCOUNT: '/manage-accounts',

    // CAMPAIGNS
    CAMPAIGNS: '/campaigns',
    CAMPAIGNS_AUTOMATION: '/automation',
    CAMPAIGNS_AUTOMATION_EVENT: '/automation/event',
    CAMPAIGNS_DASHBOARD: '/dashboard',
    CAMPAIGNS_PREFERENCES: '/preferences',

    // REMINDER
    APPOINTMENTS: '/appointments',

    // Pipeline
    PIPELINE_PAGE: '/pipeline',
};

export const PATH_ENDPOINTS = {
    // ACCOUNT SETTINGS
    SETTING: 'setting',
    SETTING_USERS: 'user',
    //
    SETTING_LIVE_CHAT: 'chatbox',
    SETTING_LIVE_CHAT_DETAIL_APPEARANCE: 'appearance',
    SETTING_LIVE_CHAT_DETAIL_GREETINGS: 'greetings',
    SETTING_LIVE_CHAT_DETAIL_PREFERENCES: 'preferences',
    SETTING_LIVE_CHAT_DETAIL_INSTALLATION: 'installation',
    WOO_RESPONSE_LIBRARY_LOGGED_RESPONSES: 'logged-responses',

    // WOO AI: campaigns/{id}/woo-ai
    WOO_AI: 'woo-ai',
    WOO_AI_WOO_BOOKING: 'woo-booking',
    WOO_AI_WOO_RESPONSE: 'woo-response',
    WOO_AI_WOO_BOOKING_SETTINGS: 'settings',
    WOO_AI_WOO_BOOKING_CALENDAR_INVITE: 'calendar-invite',
    WOO_AI_WOO_BOOKING_APPOINTMENT_CONFIRMATION: 'appointment-confirmation',
    WOO_AI_WOO_BOOKING_APPOINTMENT_REMINDER: 'appointment-reminder',
};

export class PageUrlHelper {
    public static RETURN_URL_PROPERTY: string = 'returnUrl';

    //#region URL
    public static isUrlExisted(url: string): boolean {
        return Object.keys(ENDPOINTS).some((endpointName: string) => {
            return url.startsWith(ENDPOINTS[endpointName]);
        });
    }

    public static isUrlThatWeMustRemoveUserInfo(url: string): boolean {
        return url.startsWith(ENDPOINTS.LOGIN)
            || url.startsWith(ENDPOINTS.SIGN_UP)
            || url.startsWith(ENDPOINTS.FORGOT_PASSWORD);
    }

    public static reloadWholeAppByNewUrl(params: { pathname: string; queryParamsString?: string; resetLocationHistory?: boolean}) {
        const newHref: string = window.location.origin
            + `${params.pathname.startsWith('/') ? params.pathname : '/' + params.pathname}`
            + `${params.queryParamsString ? '?' + params.queryParamsString : ''}`;
        //
        if (params.resetLocationHistory) {
            location.replace(newHref);
        } else {
            window.location.href = newHref;
        }
    }

    //#endregion

    //#region Query Params
    public static getQueryParams(): Record<string, string> {
        if (!!window.location.search && !!window.location.search.trim()) {
            const queryParamsString: string = decodeURIComponent(window.location.search).substring(1);
            const queryParamsArray: string[] = queryParamsString.split('&');
            const queryParamsObject: Record<string, string> = {};
            //
            queryParamsArray.map((item) => {
                if (!item.includes('=')) {
                    return;
                }
                //
                const itemArray: string[] = item.split('=');
                queryParamsObject[itemArray[0]] = itemArray[1];
            });
            return queryParamsObject;
        } else {
            return {};
        }
    }

    public static getSpecificPropertyInQueryParams(propertyKey: string): string {
        const queryParams: Record<string, string> = this.getQueryParams();
        return !!queryParams
            ? queryParams[propertyKey]
            : '';
    }
    //#endregion
}
