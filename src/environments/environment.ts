// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'local',
  production: false,
  baseUrl: 'http://localhost:1205',
  // baseUrl: 'https://dev-api.woosender.com',
  // baseUrl: 'https://qa-api.woosender.com',
  // baseUrl: 'https://beta-api.woosender.com',
  webSocketEndpoint: 'wss://sj90sbzb30.execute-api.us-east-1.amazonaws.com/<member-name>',
  avatarUrl: 'https://dev-woosender-files.s3.amazonaws.com/avatar',
  chatBoxLogoUrl: 'https://dev-woosender-files.s3.amazonaws.com/chatbox-logo',
  voiceMailUrl: 'https://dev-woosender-files.s3.amazonaws.com/voicemail',
  stripePublicKey: 'pk_test_j3pMOty5kvtkq7dD9QjX4RUW00RzPS1nZK',
  appKey: '386546504',
  facebookPixelId: '2939212509637955',
  googleExchangeTokenUri: 'http://localhost:1205/api/integration/connect',
  googleClientId: '254383229734-bpith1lg0q31fsq8p9014de2bai6o3gi.apps.googleusercontent.com',
  scriptDomain: 'https://js.woosender.com/dev',
  microsoftClientId: 'cdb8a230-d125-4c1b-bf5d-3207b81819cd',
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
