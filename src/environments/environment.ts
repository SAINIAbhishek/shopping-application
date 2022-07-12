// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase Web Api Key of the project
  firebaseApiKey: 'AIzaSyC7DMd0zzoFzC76im4s7jOQp2OSeg7a90o',
  // project database url on the firebase, can be found under the Realtime Database section
  firebaseDatabaseUrl: 'https://shopping-a7f0a-default-rtdb.firebaseio.com/',
  // firebase rest api endpoints
  firebaseAuthApi: 'https://identitytoolkit.googleapis.com/v1/accounts:'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
