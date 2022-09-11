/**
 * Convention
 * [FirstUpperCase]: [Camel Case]
 */

export enum AppColor {
  DefaultColor = '#00AFFF'
}

export enum TwilioOutgoingStatusType {
  dialing = 'Dialing...',
  ringing = 'Ringing...',
  onCall = 'On Call',
  disconnected = 'Call Ended'
}

export enum UserRoleType {
  Admin = 'Admin',
  User = 'User',
  InvitedUser = 'InvitedUser',
  AccountOwner = 'AccountOwner',
}

export enum Feature {
  AccountInfo = 'AccountInfo',
  Email = 'Email',
  Number = 'Number',
  BillingUsage = 'BillingUsage',
  APIKey = 'APIKey',
  Users = 'Users',
  ManagedAccount = 'ManagedAccount',
  CustomFields = 'CustomFields',
  Webhooks = 'Webhooks'
}

export enum AppActorType {
  Automation = 'automation',
  WooResponse = 'wooResponse',
  WooBooking = 'wooBooking',
  GoogleCalendarApi = 'googleCalendarApi',
  NextCampaign = 'nextCampaign',
  FirstResponse = 'firstResponse',
  StageOfPipeline = 'stageAction',
}

export enum AppActionType {
  Add = 'add',
  Edit = 'edit',
  Duplicate = 'duplicate',
  Delete = 'delete',
  DeletePermanently = 'deletePermanently',
  Reopen = 'reopen',
  Restore = 'restore',
  MarkAsClosed = 'markAsClosed',
  Block = 'block',
  Unblock = 'unblock',
  MarkAsRead = 'markAsRead',
  MarkAsUnRead = 'markAsUnRead'
}

export enum Action {
  Delete = 'delete',
  DeletePermanently = 'deletePermanently',
  Block = 'block',
  Unblock = 'unblock',
  MarkAsClosed = 'markAsClosed',
  Reopen = 'reopen',
  Restore = 'restore',
  MarkAsRead = 'markAsRead',
  Assign = 'assign',
  Unassign = 'unassign',
  AddFacebookConversationToContactExisted = 'addFacebookConversationToContactExisted',
}

export enum ExportFormatTypes {
  Xlsx = 'xlsx',
  Xls = 'xls',
  Csv = 'csv',
}

export enum IMPORT_STATUS {
  Success = 0,
  Fail = 1,
  None = 2
}

export enum SourceTimeSendType {
  Before,
  After,
  All
}

export enum ConversationTypes {
  All = 'all',
  AssignedToMe = 'assignedToMe',
  Unassigned = 'unassigned',
  Deleted = 'deleted',
  Blocked = 'blocked',
  LiveChat = 'liveChat'
}

export enum AppChannels {
  All = 'all',
  Email = 'email',
  SMS = 'sms',
  LiveChat = 'liveChat',
  Facebook = 'facebook'
}

export enum AppEnvironments {
  Local = 'local',
  Dev = 'dev',
  QA = 'qa',
  Prod = 'prod'
}

export enum BillingCardTypes {
  MasterCard = 'mastercard',
  Visa = 'visa',
  AmericanExpress = 'amex',
  Other = 'other'
}

export enum RecordingTypes {
  Upload = 'upload',
  Create = 'create'
}

export enum AudioSource {
  Url = 'url',
  Base64 = 'base64'
}

export enum MobileFooterMenu {
  Contacts = 'contacts',
  Conversations = 'conversations',
  Settings = 'settings'
}

export enum ReminderType {
  Calendar = 'Calendar',
  All = 'All',
  DueToday = 'DueToday',
  DueThisWeek = 'DueThisWeek',
  Overdue = 'Overdue',
  Completed = 'Completed'
}

export enum AddNewAccountOption {
  HimSelf = 1,
  SomeOneElse = 0
}

export enum Currency {
  USD = 'USD',
  Canada = 'CAB'
}

export enum Assignee {
  unAssignee = 'unAssignee'
}

export enum AppGrid {
  Contact = 'Contact',
  Campaign = 'Campaign',
  WooResponse = 'WooResponse',
  WooResponseLog = 'WooResponseLog'
}

export enum QuickAddContactType {
  Import = 'Import',
  Manual = 'Manual',
}

export enum ReminderDateBoxType {
  StartTime = 'StartTime',
  EndTime = 'EndTime',
  NotificationTime = 'NotificationTime'
}

export enum DomainValidationState {
  Valid = 'valid',
  Active = 'active',
}

export enum CampaignEventType {
  email = 'email',
  sms = 'sms',
  voiceMail = 'voicemail'
}

export enum None {
  Campaign = 'NoneCampaign',
  Assignee = 'NoneAssignee'
}

export enum SvgType {
  Download = 'Download',
  Preview = 'Preview',
  Close = 'Close',
  CommonFile = 'CommonFile',
  Expand = 'Expand',
  Collapse = 'Collapse',
  Send = 'Send'
}

export enum AppErrorCode {
  Error,
  Warning,
  Info
}

export enum DefaultColors {
  blue = 'defaultBlue',
  dark = 'defaultDark',
  tosca = 'defaultTosca',
  orange = 'defaultOrange',
  purple = 'defaultPurple',
  red = 'defaultRed',
}

export enum BoxPlacements {
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export enum DesktopBehaviourValue {
  onlyShowChatLauncher = 'showChatLauncher',
  openChatBox = 'openChatBox'
}

export enum MobileBehaviourValue {
  onlyShowChatBoxLauncher = 'showChatLauncher',
  hideChatBox = 'hideChatBox'
}

export enum AvailableResponseTimeValue {
  withinFewMinutes = 'withinFewMinutes',
  withinFewHours = 'withinFewHours',
  within24Hours = 'within24Hours'
}

export enum OutsideResponseTimeValue {
  showReturnTime = 'showReturnTime',
  unavailable = 'unavailable',
  hideChatBox = 'hideChatBox'
}

export enum UserPageName {
  Conversation = 'Conversation',
  //
  Contacts = 'Contacts',
  ContactDetail = 'ContactDetail',
  ContactsActive = 'ContactsActive',
  ContactsDeleted = 'ContactsDeleted',
  //
  Campaigns = 'Campaigns',
  //
  AccountSetting = 'AccountSetting',
  AccountSetting_AppointmentReminder = 'AccountSetting_AppointmentReminder',
  AccountSetting_AppointmentConfirmation = 'AccountSetting_AppointmentConfirmation',
  AccountSetting_AppointmentCalendarInvite = 'AccountSetting_AppointmentCalendarInvite',
  Users = 'Users',
  WooResponseLibraries = 'WooResponseLibraries',
  WooResponseLibrariesActive = 'WooResponseLibrariesActive',
  WooResponseLibrariesDeleted = 'WooResponseLibrariesDeleted',
  //
  AccountSetting_PipelinesActive = 'AccountSetting_PipelinesActive',
  AccountSetting_PipelinesDeleted = 'AccountSetting_PipelinesDeleted',
  // TODO: add prefix AccountSetting_
  ProductsActive = 'ProductsActive',
  ProductsDeleted = 'ProductsDeleted',
  LiveChat = 'LiveChat',
  FacebookIntegration = 'FacebookIntegration',
  //
  ManageAccount = 'ManageAccount',
  //
  Appointments = 'Appointments',
  //
  PipelinePage = 'PipelinePage',
}

export enum NextCampaignTriggerType {
  afterLeadResponds = 'afterLeadResponds',
  afterAllEventsSentOut = 'afterAllEventsSentOut',
}

export enum NotificationObjectType {
  Contact = 'contact',
  Reminder = 'reminder'
}

/**
 * Date Enum
 */
export enum TimePeriods {
  AM = 1,
  PM = 2
}

export enum Days {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum DateRangeTypes {
  Today = 'Today',
  LastSevenDays = 'Last 7 Days',
  ThisWeek = 'This Week',
  LastWeek = 'Last Week',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month',
  LastThreeMonths = 'Last 3 Months',
  AllTime = 'All Time',
  Custom = 'Custom Range'
}

export enum DateFormatTypes {
  MDY = 'MM/dd/yyyy',
  DMY = 'dd/MM/yyyy',
  MMMDY = 'MMM/dd/yyyy',
  YMD = 'yyyy/MM/dd',
  YDM = 'yyyy/dd/MM',
}

/**
 * Custom Fields
 */
export enum CustomFieldInputType {
  SingleLineText = 'singleLine',
  DropdownSelection = 'dropdown',
  DatePicker = 'date',
  Currency = 'currency',
  // eslint-disable-next-line id-blacklist
  Number = 'number',
}

export enum CustomValueGroupType {
  GeneralInfo = 'General Info',
  CampaignInfo = 'Campaign Info',
  CustomInfo = 'Custom Info',
  AssigneeInfo = 'Assignee Info',
  AccountInfo = 'Account Info',
  AppointmentInfo = 'Appointment Info',
}

export enum UserSettingType {
  // #region Conversation Page
  conversationAccordionVisibleSections = 'conversationAccordionVisibleSections',
  //#endregion
  // #region Prospect Page
  contactAccordionVisibleSections = 'contactAccordionVisibleSections',
  prospectGridPagingNumber = 'prospectGridPagingNumber',
  prospectDetailPopupAccordionVisible = 'prospectDetailPopupAccordionVisible',
  //#endregion
  // #region Campaign
  campaignGridPagingNumber = 'campaignGridPagingNumber',
  campaignGridColumn = 'campaignGridColumn',
  //#endregion
  // #region
  phoneNumberGridColumn = 'phoneNumberGridColumn',
  //#endregion
  // #region Woo Response Libraries
  wooResponseGridPagingNumber = 'wooResponseGridPagingNumber',
  wooResponseLogGridPagingNumber = 'wooResponseLogGridPagingNumber',
  wooResponseGridColumn = 'wooResponseGridColumn',
  wooResponseLogGridColumn = 'wooResponseLogGridColumn',
  wooResponseLibrariesActiveGridColumn = 'wooResponseLibrariesActiveGridColumn',
  wooResponseLibrariesActiveGridPagingNumber = 'wooResponseLibrariesActiveGridPagingNumber',
  wooResponseLibrariesDeletedGridColumn = 'wooResponseLibrariesDeletedGridColumn',
  wooResponseLibrariesDeletedGridPagingNumber = 'wooResponseLibrariesDeletedGridPagingNumber',
  //#endregion
  // #region Pipelines Setting
  pipelinesActiveGridColumn = 'pipelinesActiveGridColumn',
  pipelinesDeletedGridColumn = 'pipelinesDeletedGridColumn',
  pipelinesActiveGridPagingNumber = 'pipelinesActiveGridPagingNumber',
  pipelinesDeletedGridPagingNumber = 'pipelinesDeletedGridPagingNumber',
  //#endregion
  // #region Products
  productsActiveGridColumn = 'productsActiveGridColumn',
  productsActiveGridPagingNumber = 'productsActiveGridPagingNumber',
  productsDeletedGridColumn = 'productsDeletedGridColumn',
  productsDeletedGridPagingNumber = 'productsDeletedGridPagingNumber',
  //#endregion
  // #region Pipeline Page
  pipelinePageGridColumn = 'pipelinePageGridColumn',
  pipelinePageGridPagingNumber = 'pipelinePageGridPagingNumber',
  pipelinePageViewType = 'pipelinePageViewType',
  pipelinePagePipelineId = 'pipelinePagePipelineId',
  //#endregion
}

/**
 * Sort / Compare
 */
export enum SortingTypes {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum FilterParamsSortingTypes {
  Ascending = 1,
  Descending = -1,
}

export enum CompareTypes {
  StartWith = 'startWith',
  Equals = 'equals'
}

/**
 * UI
 */
export enum AppFontTypes {
  GothamBook = 'gotham-book',
  GothamMedium = 'gotham-medium',
  GothamBold = 'gotham-bold',
}

export enum PopoverUI {
  Width = 320,
  MaxHeight = 400,
}

export enum SideBarMenuType {
  normal = 'normal',
  normal_with_nested_items = 'normal_with_nested_items',
  secondary = 'secondary',
}

/**
 * Grid
 */
export enum GridFunctionTypes {
  onInit = 0,
  onUpdateItem = 1,
}

/**
 * Grid Phone Number
 */
export enum UpdateAccountPhoneNumberType {
  Default = 'default',
  CallForwardingPhoneNumberVoiceMail = 'callForwardingPhoneNumberVoiceMail',
  VoiceMail = 'voiceMail',
  VoiceMailSetting = 'voiceMailSetting',
  IncomingCallRecordMessage = 'incomingCallRecordMessage',
  IncomingCallMessage = 'incomingCallMessage',
  IncomingCallMessageSetting = 'incomingCallMessageSetting',
  OutGoingCall = 'outGoingCall',
  Name = 'name',
}

/**
 * Appointments
 */
export enum AppointmentMessageType {
  SmsReminder = 'smsReminder',
  EmailReminder = 'emailReminder',
  //
  SmsConfirmation = 'smsConfirmation',
  EmailConfirmation = 'emailConfirmation',
  CalendarInviteTitle = 'calendarInviteTitle',
  CalendarInviteDetails = 'calendarInviteDetails',
}

export enum MessageType {
  All = 'all',
  SMS = 'sms',
  MMS = 'mms',
  Email = 'email',
  Voicemail = 'voicemail',
  IncomingCall = 'incomingCall',
  OutgoingCall = 'outgoingCall',
  Facebook = 'facebookMessage',
  LiveChat = 'liveChat',
}

export enum IntegrationType {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  None = 'none',
  Google = 'google',
  Outlook = 'outlook'
}

/**
 * Header Notification
 */
export enum A2P10DLCNotificationType {
  NonRegistered = 'nonRegistered',
  Rejected = 'rejected',
  CampaignUseCaseFailed = 'campaignUseCaseFailed',
}

export enum NotificationType {
  All = 'All',
  Subscription = 'Subscription',
  A2P10DLC = 'A2P10DLC',
  PhoneNumber = 'PhoneNumber',
}


/**
 * SMS
 */
export enum SmsDeliveryErrorCode {
  UnreachableDestinationHandset = '30003',
  LandlineOrUnreachableCarrier = '30006',
  MessageFiltered = '30007',
  UnknownDestinationHandset = '30005',
  DailyMessageCapReached = '30023',
  UnsubscribedRecipient = '21610'
}

export enum ContactPhoneNumberType {
  Landline = 'landline',
  Mobile = 'mobile',
  Voip = 'voip',
  Unknown = 'unknown'
}
