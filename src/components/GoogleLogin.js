/*
  Developed by Liam Penn - 1415065
*/
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

// My CLIENT_ID and API_KEY from Google Calendar Project - Currently Connected to my Gmail
var CLIENT_ID = '918654715325-m1m6prpm5kmdqq3glmkvpui5vso2ip18.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBahaMZOI8jFnjLC9SPgLBJqwxNt37vSQk';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

export class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      events: ["nothing"],
    }
    this.handleClientLoad = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.getEvent = this.getEvent.bind(this);
  }

  //Functions Called On Load - Possibly not neeed?
  componentDidMount() {
    this.timerID = setInterval(
      () => this.checkSignInStatus(),
      5000
    );
    // Handles the client load
    handleClientLoad();
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  // Refresh the components state !Required!
  checkSignInStatus() {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  getEvent(){
    return "here";
  }

  renderAuthButton() {
    // Added this.props.show which is used to determine when to show the sign in - sign out buttons
    if(this.props.show){
      if (this.state.isSignedIn === null) {
        return <div>I dont know if I am signed in</div>;
      } else if (this.state.isSignedIn) {
        return <Button variant="secondary" id="signout_button" onClick={this.handleSignoutClick}>Sign Out with Google</Button>;
      } else {
        return <Button variant="secondary" id="authorize_button" onClick={this.handleAuthClick}>Sign in with Google Email</Button>;
      }
    }
  }

  render() {
    //console.log(getEvents());
    return <div>{this.renderAuthButton()}</div>;
  }
}


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
    //this.appendPre(JSON.stringify(error, null, 2));
  });
}


/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("signed in");
    listUpcomingEvents();
  } else {
    console.log("signed out");
    calendarEvents = [];
  }
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
var calendarEvents = [];
function listUpcomingEvents() {
  window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date(2020, 1)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 15,
    'orderBy': 'startTime'
  }).then(function (response) {
    var events = response.result.items;
    if (events.length > 0) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if(!event.start.dateTime){
            calendarEvents.push([event.summary, event.start.date, randomColor]);
        } else {
            calendarEvents.push([event.summary, event.start.dateTime, randomColor]);
        }
        
      }
    } else {
      console.log("no events");
    }
  });
}

function getEvents() {
  return calendarEvents;
}

// Exports the calendarEvents obtained by google calendar api.
export {
  calendarEvents as events
}

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2020-03-7T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2020-03-07T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'attendees': [
    {'email': 'liamcsdev@gmail.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};


export const SendEvent = () => {
  var request = window.gapi.client.calendar.events.insert({
    'calendarId': "liamparsons2013@gmail.com",
    'resource': event
  });
  
  request.execute(function(event) {
    console.log('Event created: ' + event.summary);
  });
}

export class CreateEvent extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("event created?");
    var request = window.gapi.client.calendar.events.insert({
      'calendarId': "primary",
      'resource': this.props.event
    });
    
    request.execute(function(event) {
      console.log('Event created: ' + event.summary);
    });
  }

  render(){
    return(
      <GoogleLogin/>
    );
  }
}

// Returns the accessible google calendars
export const getList = () => {
  var request = window.gapi.client.calendar.calendarList.list();

  request.execute(function(resp){
          var calendars = resp.items[0].id;
          console.log(calendars);
  });
}


//export default GoogleLogin;
