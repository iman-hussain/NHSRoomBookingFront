
var CLIENT_ID = '918654715325-45up7aj6ab0cohqestspdi2p9e0a4uam.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBahaMZOI8jFnjLC9SPgLBJqwxNt37vSQk';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

/**
 *  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
  window.gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
var isSignedIn = false;
function initClient() {
  window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(isSignedIn);


  }, function (error) {
    console.log(JSON.stringify(error, null, 2));
    this.appendPre(JSON.stringify(error, null, 2));
  });
}