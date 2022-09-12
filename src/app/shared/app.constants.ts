import { positionConfig } from 'devextreme/animation/position';
import { animationConfig } from 'devextreme/animation/fx';
//
import { COMMON_MESSAGE } from './message';
import { ListItemModel } from './models';
import {
    AddNewAccountOption,
    AvailableResponseTimeValue,
    ExportFormatTypes,
    NextCampaignTriggerType,
    OutsideResponseTimeValue,
    TimePeriods,
    UserRoleType
} from './app.enum';

// Move to AppStore
export const LOGGED_ADMIN_USER_STORE_NAME = 'LoggedAdminUser';
export const ADMIN_TOKEN_STORE_NAME = 'AdminAccessToken';
//

export const AVATAR_PROFILE_DEFAULT = 'avatar-default.png';
export const IS_REFRESH_BROWSER = 'IsRefreshBrowser';
export const SMS_LIMIT_TEXT_MESSAGE = 1000;
export const REMINDER_LIMIT_NUMBER = 8;
export const DELAY_TIME_AFTER_CALL_ENDED = 1500;
export const EVERY_5_MINUTES = 300000; // 5 minutes
export const CONTACT_NEW_TIME = 28800000; // 8 hours
export const DEFAULT_DAYS_TO_KEEP_DELETED_CONTACT = 30;

export const ALLOWED_PAGE_SIZES = [
    25, 50, 100
];

export const PROSPECT_ALLOWED_PAGE_SIZES = [
    25, 50, 100, 200
];

export const MESSAGE_TYPE = {
    all: 'all',
    sms: 'sms',
    mms: 'mms',
    email: 'email',
    voiceMail: 'voicemail',
    incomingCall: 'incomingCall',
    outgoingCall: 'outgoingCall',
    facebook: 'facebookMessage',
    liveChat: 'liveChat',
};

export const PROSPECT_FIELD_NAMES = {
    firstName: 'firstName',
    lastName: 'lastName',
    leadStatus: 'leadStatus',
    phoneNumber: 'phoneNumber',
    email: 'email',
    date: 'date',
    time: 'time',
    campaignId: 'campaignId',
    flag: 'flag',
    revenue: 'revenue',
    company: 'company'
};

export const CAMPAIGN_DETAILS_PAGES = {
    Dashboard: 'dashboard',
    Automation: 'automation',
    Preferences: 'preferences',
    WooAI: 'woo-AI',
    WooAIBooking: 'woo-booking',
    WooAIResponse: 'woo-response'
};

export const PROSPECT_PAGES = {
    Grid: 'grid',
    Details: 'details',
    Import: 'import',
    DeletedGrid: 'deleted-grid',
    CustomInfo: 'custom-info'
};

export const AUTOMATON_EVENT_TYPES = {
    Email: 'email',
    Sms: 'sms',
    Voicemail: 'voicemail'
};

export const USER_SOURCE_ROLES: ListItemModel<string, UserRoleType>[] = [
    new ListItemModel<string, UserRoleType>({
        value: UserRoleType.Admin,
        key: 'Admin',
        visible: true
    }),
    new ListItemModel<string, UserRoleType>({
        value: UserRoleType.User,
        key: 'User',
        visible: true
    }),
    new ListItemModel<string, UserRoleType>({
        value: UserRoleType.InvitedUser,
        key: 'Invited User',
        visible: false
    }),
    new ListItemModel<string, UserRoleType>({
        value: UserRoleType.AccountOwner,
        key: 'Account Owner',
        visible: false
    })
];

export const ACCOUNT_SETTINGS = {
    UserDetails: 'userDetails',
    ChatBoxDetail: 'chatBox-detail',
    NumberOfLastCompanyDigit: 5
};

export const USER_FILTER_TYPES = {
    All: 'all',
    Admin: 'admin',
    User: 'user',
    InvitedUser: 'invitedUser'
};

export const CONTACT_INFO_TYPE = {
    GeneralInfo: 'generalInfo',
    CampaignInfo: 'campaignInfo',
    CustomInfo: 'customInfo',
    Notes: 'notes',
    Tags: 'tags',
    AssigneeInfo: 'assigneeInfo',
    Appointments: 'appointments',
    Opportunities: 'opportunities',
    Tasks: 'tasks',
    WooAiSetting: 'wooAiSetting'
};

export const CONVERSATION_UTILITY_MENU: { value: string; name: string; display: string }[] = [
    {
        value: CONTACT_INFO_TYPE.GeneralInfo,
        name: COMMON_MESSAGE.ContactGeneralInfo,
        display: COMMON_MESSAGE.ContactGeneralInfo
    },
    {
        value: CONTACT_INFO_TYPE.Opportunities,
        name: 'Opportunities',
        display: 'Opportunities',
    },
    {
        value: CONTACT_INFO_TYPE.CampaignInfo,
        name: COMMON_MESSAGE.ContactCampaignInfo,
        display: COMMON_MESSAGE.ContactCampaignInfo
    },
    {
        value: CONTACT_INFO_TYPE.WooAiSetting,
        name: COMMON_MESSAGE.ContactWooAiSetting,
        display: COMMON_MESSAGE.ContactWooAiSetting
    },
    {
        value: CONTACT_INFO_TYPE.CustomInfo,
        name: COMMON_MESSAGE.ContactCustomInfo,
        display: COMMON_MESSAGE.ContactCustomInfo
    },
    {
        value: CONTACT_INFO_TYPE.Notes,
        name: COMMON_MESSAGE.NotesTitle,
        display: COMMON_MESSAGE.NotesTitle
    },
    {
        value: CONTACT_INFO_TYPE.Tags,
        name: COMMON_MESSAGE.TagsTitle,
        display: COMMON_MESSAGE.TagsTitle
    },
    {
        value: CONTACT_INFO_TYPE.Appointments,
        name: COMMON_MESSAGE.AppointmentTitle,
        display: COMMON_MESSAGE.AppointmentTitle
    },
    // {
    //     value: CONTACT_INFO_TYPE.Tasks,
    //     name: COMMON_MESSAGE.TasksTitle,
    //     display: COMMON_MESSAGE.TasksTitle
    // }
];

export const CONVERSATION_NON_CONTACT_MENU: { value: string; name: string; display: string }[] = [
    {
        value: CONTACT_INFO_TYPE.WooAiSetting,
        name: COMMON_MESSAGE.ContactWooAiSetting,
        display: COMMON_MESSAGE.ContactWooAiSetting
    },
];

export const COPY_CAMPAIGN_TYPE = {
    Existing: 1,
    Template: 2
};

export const COPY_CAMPAIGN_OPTION = [
    { type: COPY_CAMPAIGN_TYPE.Existing, value: 'Existing Campaign' },
    { type: COPY_CAMPAIGN_TYPE.Template, value: 'Campaign Template' },
];


export const SEARCH_NUMBER_BY = {
    AreaCode: 1,
    NearNumber: 2,
};

export const SEARCH_NUMBER_BY_OPTION = [
    { type: SEARCH_NUMBER_BY.AreaCode, value: 'Area Code' },
    { type: SEARCH_NUMBER_BY.NearNumber, value: 'Near Number' },
];

export const USER_PAGING_TYPE = {
    Contact: 1,
    Campaign: 2,
    WooResponse: 3,
    WooResponseLog: 4
};

export const DEFAULT_PAGING_SIZE = 25;

export const CONTACT_ACTIONS_TYPE = {
    Import: 1,
    Export: 2,
};

export const CONTACT_ACTIONS_VALUE = {
    Import: 'Import Contacts',
    Export: 'Export Contacts',
};

export const CONTACT_ACTIONS = [
    { type: CONTACT_ACTIONS_TYPE.Import, value: CONTACT_ACTIONS_VALUE.Import },
    { type: CONTACT_ACTIONS_TYPE.Export, value: CONTACT_ACTIONS_VALUE.Export },
];

export const EXPORT_FORMATS = [
    { type: ExportFormatTypes.Csv, value: 'CSV (Comma delimited) (*.csv)' },
    { type: ExportFormatTypes.Xlsx, value: 'Excel Workbook (*.xlsx)' },
    { type: ExportFormatTypes.Xls, value: 'Excel 97-2003 Workbook (*.xls)' },
];

export const COUNTRY = {
    Canada: 'ca',
    US: 'us',
    UK: 'gb'
};

export const ADD_NEW_ACCOUNT_OPTION = [
    { text: 'I will pay and manage the client\'s account', value: AddNewAccountOption.HimSelf },
    { text: 'The client will pay and manage their own account', value: AddNewAccountOption.SomeOneElse },
];

export const CURRENCY_FORMAT = '$#,##0.00########';
export const NUMBER_FORMAT = '#,##0.##';

export const ADMIN_SUBSCRIPTION_PAGES = {
    Admin: 'admin',

    // Subscription Plan
    New: 'new',
};

export const CONVERSATION_TYPE = {
    All: -1,
    Open: 0,
    Closed: 1,
};

export const CONVERSATION_ALL_TYPE = [
    { type: CONVERSATION_TYPE.All, value: 'All Status' },
    { type: CONVERSATION_TYPE.Open, value: 'Open' },
    { type: CONVERSATION_TYPE.Closed, value: 'Closed' },
];

/**
 * @description The types of the file attachments
 */
export const FILE_ATTACHMENT_TYPES = {
    Video: ['.mp4', '.flv', '.3gp', '.mov', '.wmv', '.avi'],
    Audio: ['.mp3', '.wav', '.amr', '.m4a'],
    Image: ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'],
    All: ['.mp4', '.flv', '.3gp', '.mov', '.wmv', '.avi', '.mp3', '.wav', '.amr', '.m4a', '.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp']
};

export const CONVERSATION_KEEP_DATA = {
    latestFolder: 'LatestFolderConversationSelection',
    latestConversation: 'LatestConversationSelection',
};

export const DEFAULT_NOTIFY_BEFORE_DUEDATE_MINUTES = 30;

export const CONTACT_GRID_COLUMN_DEFAULT_SETTING = {
    contactName: {
        orderIndex: 0,
        isVisible: true,
        width: 200
    },
    phoneNumber: {
        orderIndex: 1,
        isVisible: true,
        width: 200
    },
    email: {
        orderIndex: 2,
        isVisible: true,
        width: 200
    },
    leadStatus: {
        orderIndex: 3,
        isVisible: true,
        width: 200
    },
    pipeline: {
        orderIndex: 4,
        isVisible: true,
        width: 200
    },
    stage: {
        orderIndex: 5,
        isVisible: true,
        width: 200
    },
    campaignName: {
        orderIndex: 6,
        isVisible: true,
        width: 200
    },
    addedCampaignAt: {
        orderIndex: 7,
        isVisible: true,
        width: 200
    },
    startCampaignAt: {
        orderIndex: 8,
        isVisible: true,
        width: 200
    },
    assignee: {
        orderIndex: 9,
        isVisible: true,
        width: 200
    },
    createdAt: {
        orderIndex: 10,
        isVisible: true,
        width: 200
    },
    tags: {
        orderIndex: 11,
        isVisible: false,
        width: 200
    }
};

export const REMINDER_BEFORE_VALUES = [
    { value: 5, text: '5 minutes' },
    { value: 10, text: '10 minutes' },
    { value: 15, text: '15 minutes' },
    { value: 30, text: '30 minutes' },
    { value: 45, text: '45 minutes' },
    { value: 60, text: '1 hour' },
    { value: 90, text: '1.5 hours' },
    { value: 120, text: '2 hours' },
    { value: 150, text: '2.5 hours' },
    { value: 180, text: '3 hours' },
    { value: 210, text: '3.5 hours' },
    { value: 240, text: '4 hours' },
    { value: 270, text: '4.5 hours' },
    { value: 300, text: '5 hours' },
    { value: 330, text: '5.5 hours' },
    { value: 360, text: '6 hours' },
    { value: 390, text: '6.5 hours' },
    { value: 420, text: '7 hours' },
    { value: 450, text: '7.5 hours' },
    { value: 480, text: '8 hours' },
    { value: 510, text: '8.5 hours' },
    { value: 540, text: '9 hours' },
    { value: 570, text: '9.5 hours' },
    { value: 600, text: '10 hours' },
    { value: 630, text: '10.5 hours' },
    { value: 660, text: '11 hours' },
    { value: 690, text: '11.5 hours' },
    { value: 720, text: '12 hours' },
    { value: 750, text: '12.5hours' },
    { value: 780, text: '13 hours' },
    { value: 810, text: '13.5 hours' },
    { value: 840, text: '14 hours' },
    { value: 870, text: '14.5 hours' },
    { value: 900, text: '15 hours' },
    { value: 930, text: '15.5 hours' },
    { value: 960, text: '16 hours' },
    { value: 990, text: '16.5 hours' },
    { value: 1020, text: '17 hours' },
    { value: 1050, text: '17.5 hours' },
    { value: 1080, text: '18 hours' },
    { value: 1110, text: '18.5 hours' },
    { value: 1140, text: '19 hours' },
    { value: 1170, text: '19.5 hours' },
    { value: 1200, text: '20 hours' },
    { value: 1230, text: '20.5 hours' },
    { value: 1260, text: '21 hours' },
    { value: 1290, text: '21.5 hours' },
    { value: 1320, text: '22 hours' },
    { value: 1350, text: '22.5 hours' },
    { value: 1380, text: '23 hours' },
    { value: 1410, text: '23.5 hours' },
];

export const TWILIO_VOICES = [
    { value: 'man', text: 'Man' },
    { value: 'woman', text: 'Woman' },
    { value: 'alice', text: 'Alice	' },
];


export const EVENTS_REPORT_ID = {
    email: 'email-type',
    voiceMail: 'voicemail-type',
    sms: 'sms-type'
};

export const EVENTS_REPORT_NAME = {
    email: 'Email',
    voiceMail: 'Voicemail',
    sms: 'SMS'
};

export const EVENTS_REPORT_TABS = [
    {
        id: EVENTS_REPORT_ID.email,
        // Text: EMAILS
        text: (EVENTS_REPORT_NAME.email + 's').toUpperCase(),
    },
    {
        id: EVENTS_REPORT_ID.voiceMail,
        text: EVENTS_REPORT_NAME.voiceMail.toUpperCase(),
    },
    {
        id: EVENTS_REPORT_ID.sms,
        text: EVENTS_REPORT_NAME.sms.toUpperCase(),
    }
];

export const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/calendar' +
    ' https://www.googleapis.com/auth/userinfo.email' +
    ' https://www.googleapis.com/auth/calendar.events'];

export const OUTLOOK_SCOPES = 'Calendars.ReadWrite MailboxSettings.Read email offline_access openid profile User.Read User.ReadWrite User.ReadWrite.All';

export const COLOR_AXIS = '#F5F6F7';
export const NONE_CAMPAIGN_VALUE = 'No Campaign (Assign to no campaign)';


export const CALENDAR_SYNC_OPTION = [
    { key: 1, value: 'One way' },
    { key: 2, value: 'Two way' }
];

export const CAMPAIGN_TIME_UNIT = {
    day: 'Day',
    month: 'Month',
    week: 'Week'
};

// FBI Warning: Do not modify these values
export const GOOGLE_CALENDAR_EXCEPTION_REASON = {
    insufficientPermissions: 'insufficientPermissions',
    notACalendarUser: 'notACalendarUser',
    invalidGrant: 'invalidGrant',
    unauthorized: 'unauthorized',
    badRequest: 'badRequest',
    notFound: 'notFound',
};

export const OUTLOOK_CALENDAR_EXCEPTION_REASON = {
    forbidden: 'outlookForbidden',
    unauthorized: 'outlookUnauthorized'
};

export const HTML_EDITOR_PARENT_COMPONENT = {
    event: 'Event',
    conversation: 'Conversation',
    emailInfo: 'email-info',
    messageTemplate: 'message-template',
};

export const AVATAR_PARENT_COMPONENT = {
    profile: 'profile',
    chatBoxAppearance: 'chatBoxAppearance',
};

export const IMAGE_ERROR_BASE_64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA8ZJREFUeJxtVElsHEUUfb+6erpnszNeBw2OY3lCFIdIYRE3OCAMghPiioRyiuQLN0SkiDsHuHNA4ppgIcQiDkCURBhFUQgeI8uQRbYztmHs2LGH2Xq6p+tT3T0eeqx8qfSru/5/9f5Wcu6Tyx8+PXXyUm4gkwUzIxQiINgf1fEzQBBRrdlq3l3bfnf95vy3P1/5XEnpHOTOTeczgyNjaHWUNkbXsScUKY5/hqA5W6JxcJDc3KoMrK2UhP6vJCslWAFL2w52XYFBWYWJf9FBGi2MBDzwJAl4FmwHBcFg3w8uCG+SEXUNrXVG1vhl40vk8ABVTOC2eA91GteWYZgxhsxR4F7oGxcZ3UYktFtBLdJz/rx2SWj3JdpIvoiHMk8GR0Yhlup6aOLkR3mMDuOA+i6hEZXIcLuZhqXq5Io0i1SKbMlsaHv3748Y3jrk6EUS9mkWAb4KkIJKhisC5G4+AhYNs0jryVkecO+jLifhJCaR0GjoPEKnelXH2IaRXYRMHifDyDB5kW9UM/U/wyAPhta+HMJKdg6kHRUloEQaormCx2sfw2s3wwJ5lcv63MNQ4TzcNro5ZB2lHwFSN83BTVLo0GVKH2sgHYShrZ12mev7t0iQrYEUXHcVZmqJTc3A6/ZA6H+UYXBgGARL9reGkXsBO9mXoP66CbtBaM0UcWx4FrYGbBF6Ve4DDKpstK7BcSpU71h9DR2UcOr066g9ssjdX8VTM28D1h45lS+QVidB1gwFoyR05/ZVmRs/0X79DpxkOkiI/oVDHdLwvQaz1YZT+YoMDXFqDzw2PkutRCHoaBaHOTwMTfmMRr0Nzz3SqV2yPKrVcAKy4WCyYeH56VkoZWB5dQHKS6HHkKMiYWLkrC6CYMMwj6IxevOsN3s7mLZNLrds2KoFyykjU09oqxjDgOMrZy8g7hjb9zR3PGzf+AzZ1CZ9+v0KzpxI4rVnLXp142HqoJgxl/+EJx3X58e1ltrcrQlw/8D2tM6l6DgsdkrIpv+hjL3KAxYhiTYdS9lcnBp4/x2v2DgzPXJFbmxubS3cWV68d9+W3B9iX6jD2B8+l3kwPnp8yzREjYoTg5zPka5XFUNjgyeSleSbmb36Lbl0/ev50o3vrnM0LLFkHe4j2h+8kZ4bnR0/77OBZsfEqQkglZD6DTUhrT27kG+/dfuP6g/ymenJnY31td3oMYlQwsHXS+inhcLVQblcK1371VkwbFNE8x/Fwxw9Qp7jq9K9XVf+cvXHoDz+E3qlT7KU/+a3u+XffRVFEk90IEKQJi82/gPalpp6ZAe69QAAAABJRU5ErkJggg==';

export const TWILIO_MMS_MEDIA_TYPE_ACCEPTED = [
    'audio/basic',
    'audio/L24',
    'audio/mp4',
    'audio/mpeg',
    'audio/ogg',
    'audio/vorbis',
    'audio/vnd.rn-realaudio',
    'audio/vnd.wave',
    'audio/3gpp',
    'audio/3gpp2',
    'audio/ac3',
    'audio/vnd.wave',
    'audio/webm',
    'audio/amr-nb',
    'audio/amr',

    'video/mpeg',
    'video/mp4',
    'video/quicktime',
    'video/webm',
    'video/3gpp',
    'video/3gpp2',
    'video/3gpp-tt',
    'video/H261',
    'video/H263',
    'video/H263-1998',
    'video/H263-2000',
    'video/H264',

    'image/jpeg',
    'image/gif',
    'image/png'
];

export const TOLL_FREE_PREFIX_NUMBERS = ['800', '888', '877', '866', '855', '844', '833'];

export const PHONE_NUMBER_TYPE = {
    Local: 'Local',
    TollFree: 'Toll Free',
};

export const LIST_OF_UNICODE_CHARACTER_REPLACED_BY_SMART_ENCODING =
    ['AB', 'BB', 'U201C', 'U201D', 'U02BA', 'U02EE', 'U201F', 'U275D', 'U275E', 'U301D', 'U301E', 'UFF02', 'U2018', 'U2019', 'U02BB',
        'U02C8', 'U02BC', 'U02BD', 'U02B9', 'U201B', 'UFF07', 'U00B4', 'U02CA', 'U0060', 'U02CB', 'U275B', 'U275C', 'U0313', 'U0314',
        'UFE10', 'U3001', 'F7', 'BC', 'BD', 'BE', 'U29F8', 'U0337', 'U0338', 'U2044', 'U2215', 'UFF0F', 'U29F9', 'U29F5', 'U20E5',
        'UFE68', 'UFF3C', 'U0332', 'UFF3F', 'U20D2', 'U20D3', 'U2223', 'UFF5C', 'U23B8', 'U23B9', 'U23D0', 'U239C', 'U239F', 'U23BC',
        'U23BD', 'U2015', 'UFE63', 'UFF0D', 'U2010', 'U2043', 'UFE6B', 'UFF20', 'UFE69', 'UFF04', 'U01C3', 'UFE15', 'UFE57', 'UFF01',
        'UFE5F', 'UFF03', 'UFE6A', 'UFF05', 'UFE60', 'UFF06', 'U201A', 'U0326', 'UFE50', 'UFE51', 'UFF0C', 'UFF64', 'U2768', 'U276A',
        'UFE59', 'UFF08', 'U27EE', 'U2985', 'U2769', 'U276B', 'UFE5A', 'UFF09', 'U27EF', 'U2986', 'U204E', 'U2217', 'U229B', 'U2722',
        'U2723', 'U2724', 'U2725', 'U2731', 'U2732', 'U2733', 'U273A', 'U273B', 'U273C', 'U273D', 'U2743', 'U2749', 'U274A', 'U274B',
        'U29C6', 'UFE61', 'U02D6', 'UFE62', 'UFF0B', 'U3002', 'UFE52', 'UFF0E', 'U3002', 'UFF10', 'UFF11', 'UFF12', 'UFF13', 'UFF14',
        'UFF15', 'UFF16', 'UFF17', 'UFF18', 'UFF19', 'U02D0', 'U02F8', 'U2982', 'UA789', 'UFE13', 'UFF1A', 'U204F', 'UFE14', 'UFE54',
        'UFF1B', 'UFE64', 'U0347', 'UA78A', 'UFE66', 'UFF1D', 'UFE65', 'UFF1E', 'UFE16', 'UFE56', 'UFF1F', 'UFF21', 'U1D00', 'UFF22',
        'U0299', 'UFF23', 'U1D04', 'UFF24', 'U1D05', 'UFF25', 'U1D07', 'UFF26', 'UA730', 'UFF27', 'U0262', 'UFF28', 'U029C', 'UFF29',
        'U026A', 'UFF2A', 'U1D0A', 'UFF2B', 'U1D0B', 'UFF2C', 'U029F', 'UFF2D', 'U1D0D', 'UFF2E', 'U0274', 'UFF2F', 'U1D0F', 'UFF30',
        'U1D18', 'UFF31', 'UFF32', 'U0280', 'UFF33', 'UA731', 'UFF34', 'U1D1B', 'UFF35', 'U1D1C', 'UFF36', 'U1D20', 'UFF37', 'U1D21',
        'UFF38', 'UFF39', 'U028F', 'UFF3A', 'U1D22', 'U02C6', 'U0302', 'UFF3E', 'U1DCD', 'U2774', 'UFE5B', 'UFF5B', 'U2775', 'UFE5C',
        'UFF5D', 'UFF3B', 'UFF3D', 'U02DC', 'U02F7', 'U0303', 'U0330', 'U0334', 'U223C', 'UFF5E', 'U00A0', 'U2000', 'U2001', 'U2002',
        'U2003', 'U2004', 'U2005', 'U2006', 'U2007', 'U2008', 'U2009', 'U200A', 'U202F', 'U205F', 'U3000', 'U008D', 'U009F', 'U0080',
        'U0090', 'U009B', 'U0010', 'U0009', 'U0000', 'U0004', 'U0003', 'U0017', 'U0019', 'U0011', 'U0012', 'U0013', 'U0014', 'U2017',
        'U2013', 'U2014', 'U201A', 'U202F', 'U2039', 'U203A', 'U203C', 'U201E', 'U201D', 'U+201C', 'U201B', 'U2026', 'U2028', 'U2029', 'U205F', 'U2060'];

export const UNICODE_NAME = 'UTF16';

export const CHATBOX_CUSTOM_DEFAULT_COLOR = '#4882C7';

// Chat BOX
export const behaviorTabType = {
    desktop: 'Desktop',
    mobile: 'Mobile',
};

export const responseTimeTabType = {
    available: 'Available',
    outside: 'OutsideHours',
};

export const responseTimeTabTitle = {
    available: 'Available',
    outside: 'Outside office hours',
};

export const CHAT_BOX_PAGES = {
    appearance: 'appearance',
    greetings: 'greetings',
    preferences: 'preferences',
    installation: 'installation',
    wooAI: 'wooAI',
    wooBooking: 'wooBooking',
    wooResponse: 'wooResponse',
};

export const FACEBOOK_PAGES = {
    integration: 'integration',
    wooAI: 'wooAI',
};

export const CAMPAIGN_PAGES = {
    dashboard: 'dashboard',
    automation: 'automation',
    wooAI: 'wooAI',
    wooAIBooking: 'wooAIBooking',
    wooAIResponse: 'wooAIResponse',
    preferences: 'preferences',
};

export const availableSelectionItems = [
    {
        text: 'Typically replies within a few minutes',
        value: AvailableResponseTimeValue.withinFewMinutes
    },
    {
        text: 'Typically replies within a few hours',
        value: AvailableResponseTimeValue.withinFewHours
    },
    {
        text: 'Typically replies within a 24 hours',
        value: AvailableResponseTimeValue.within24Hours
    },
];

export const outsideResponseTimeSelectionItems = [
    {
        text: 'Show return time',
        value: OutsideResponseTimeValue.showReturnTime
    },
    {
        text: 'We are currently unavailable',
        value: OutsideResponseTimeValue.unavailable
    },
    {
        text: 'Hide Live Chat widget',
        value: OutsideResponseTimeValue.hideChatBox
    },
];

export const NEXT_CAMPAIGN_TRIGGER_TYPES = [
    {
        text: 'After lead responds',
        value: NextCampaignTriggerType.afterLeadResponds
    },
    {
        text: 'After all Campaign Events are sent out',
        value: NextCampaignTriggerType.afterAllEventsSentOut
    },
];

export const MESSAGE_TEMPLATES_TYPES = {
    Sms: 'sms',
    Email: 'email'
};

export const MESSAGE_TEMPLATE_DELETED = 'Message template deleted!';

/**
 * Date Time
 */
export const TIME_PERIODS: { value: number; text: string }[] = [
    { value: TimePeriods.AM, text: 'AM' },
    { value: TimePeriods.PM, text: 'PM' },
];

/**
 * Popup
 */
export const POPUP_ANIMATION = null;

export const POPUP_ANIMATION_DEFAULT: { hide?: animationConfig; show?: animationConfig } = {
    show: {
        type: 'pop',
        duration: 400,
        from: {
            scale: 0.5,
            opacity: 0,
            position: {
                my: 'center',
                at: 'center',
                of: window
            }
        },
        to: {
            scale: 1,
            opacity: 1,
            position: {
                my: 'center',
                at: 'center',
                of: window
            }
        }
    },
    hide: {
        type: 'pop',
        duration: 400,
        from: {
            scale: 1,
            opacity: 1,
            position: {
                my: 'center',
                at: 'center',
                of: window
            }
        },
        to: {
            scale: 0.5,
            opacity: 0,
            position: {
                my: 'center',
                at: 'center',
                of: window
            }
        }
    }
};

export const POPUP_POSITION_CENTER: positionConfig = { my: 'center', at: 'center', of: window };

/**
 * Appointments
 */
export const APPOINTMENT_MESSAGE_TEMPLATES = {
    // Account Settings
    CALENDAR_INVITE_TITLE: 'Call with {{FirstName}} and {{AppointmentAssigneeFirstName}}',
    CALENDAR_INVITE_DETAILS: '<p>Call with {{FirstName}} and {{AppointmentAssigneeFirstName}} at {{AppointmentStartDateTime}} {{AccountTimeZone}}.<p>',
    SMS_CONFIRMATION: 'Hi {{FirstName}}, this is a confirmation message that you have an appointment with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndTime}} {{AccountTimeZone}}.'
        + ' If you need to reschedule please text or email us back to reschedule your appointment.',
    EMAIL_CONFIRMATION: '<p>Hi {{FirstName}},</p>'
        + '<p><br></p>'
        + '<p>This is a confirmation message that you have an appointment with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndTime}} {{AccountTimeZone}}.</p>'
        + '<p><br></p>'
        + '<p>If you need to reschedule please text or email us back to reschedule your appointment.</p>',
    SMS_REMINDER: 'Hi {{FirstName}}, we want to remind you that you have a call coming up with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndDateTime}} {{AccountTimeZone}}.'
        + ' If you need to reschedule please text or email us back to reschedule your appointment.',
    EMAIL_REMINDER: '<p>Hi {{FirstName}},</p>'
        + '<p><br></p>'
        + '<p>We want to remind you that you have a call coming up with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndDateTime}} {{AccountTimeZone}}.</p>'
        + '<p><br></p>'
        + '<p>If you need to reschedule please text or email us back to reschedule your appointment.</p>',

    // Woo Booking
    WOO_BOOKING_CALENDAR_INVITE_TITLE: 'Call with {{FirstName}} and {{AppointmentAssigneeFirstName}}',
    WOO_BOOKING_CALENDAR_INVITE_DETAILS: '<p>Call with {{FirstName}} and {{AppointmentAssigneeFirstName}} at {{AppointmentStartDateTime}} {{CampaignTimeZone}}.<p>',
    WOO_BOOKING_SMS_CONFIRMATION: 'Hi {{FirstName}}, this is a confirmation message that you have an appointment with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndTime}} {{CampaignTimeZone}}.'
        + ' If you need to reschedule please text or email us back to reschedule your appointment.',
    WOO_BOOKING_EMAIL_CONFIRMATION: '<p>Hi {{FirstName}},</p>'
        + '<p><br></p>'
        + '<p>This is a confirmation message that you have an appointment with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndTime}} {{CampaignTimeZone}}.</p>'
        + '<p><br></p>'
        + '<p>If you need to reschedule please text or email us back to reschedule your appointment.</p>',
    WOO_BOOKING_SMS_REMINDER: 'Hi {{FirstName}}, we want to remind you that you have a call coming up with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndDateTime}} {{CampaignTimeZone}}.'
        + ' If you need to reschedule please text or email us back to reschedule your appointment.',
    WOO_BOOKING_EMAIL_REMINDER: '<p>Hi {{FirstName}},</p>'
        + '<p><br></p>'
        + '<p>We want to remind you that you have a call coming up with {{AppointmentAssigneeFullName}} at {{AppointmentStartDateTime}} - {{AppointmentEndDateTime}} {{CampaignTimeZone}}.</p>'
        + '<p><br></p>'
        + '<p>If you need to reschedule please text or email us back to reschedule your appointment.</p>',
};

export const APPOINTMENT_REMINDER_TIME_BEFORE_EVENTS: ListItemModel<number, string>[] = [
    new ListItemModel<number, string>({ key: 15, value: '15 minutes' }),
    new ListItemModel<number, string>({ key: 30, value: '30 minutes' }),
    new ListItemModel<number, string>({ key: 45, value: '45 minutes' }),
    new ListItemModel<number, string>({ key: 60, value: '1 hour' }),
    new ListItemModel<number, string>({ key: 120, value: '2 hours' }),
    new ListItemModel<number, string>({ key: 180, value: '3 hours' }),
    new ListItemModel<number, string>({ key: 240, value: '4 hours' }),
    new ListItemModel<number, string>({ key: 300, value: '5 hours' }),
    new ListItemModel<number, string>({ key: 360, value: '6 hours' }),
    new ListItemModel<number, string>({ key: 420, value: '7 hours' }),
    new ListItemModel<number, string>({ key: 480, value: '8 hours' }),
    new ListItemModel<number, string>({ key: 540, value: '9 hours' }),
    new ListItemModel<number, string>({ key: 600, value: '10 hours' }),
    new ListItemModel<number, string>({ key: 660, value: '11 hours' }),
    new ListItemModel<number, string>({ key: 720, value: '12 hours' }),
    new ListItemModel<number, string>({ key: 780, value: '13 hours' }),
    new ListItemModel<number, string>({ key: 840, value: '14 hours' }),
    new ListItemModel<number, string>({ key: 900, value: '15 hours' }),
    new ListItemModel<number, string>({ key: 960, value: '16 hours' }),
    new ListItemModel<number, string>({ key: 1020, value: '17 hours' }),
    new ListItemModel<number, string>({ key: 1080, value: '18 hours' }),
    new ListItemModel<number, string>({ key: 1140, value: '19 hours' }),
    new ListItemModel<number, string>({ key: 1200, value: '20 hours' }),
    new ListItemModel<number, string>({ key: 1260, value: '21 hours' }),
    new ListItemModel<number, string>({ key: 1320, value: '22 hours' }),
    new ListItemModel<number, string>({ key: 1380, value: '23 hours' }),
    new ListItemModel<number, string>({ key: 1440, value: '1 day' }),
    new ListItemModel<number, string>({ key: 2880, value: '2 days' }),
    new ListItemModel<number, string>({ key: 4320, value: '3 days' }),
    new ListItemModel<number, string>({ key: 5760, value: '4 days' }),
    new ListItemModel<number, string>({ key: 7200, value: '5 days' }),
];

export const CONTACT_IMPORT_EXTENSIONS_SUPPORTED = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/excel',
    'text/csv'
];

export const NONEXISTENT_VALUE = 'Nonexistent';

export const UNASSIGNED_VALUE = 'Unassigned';
