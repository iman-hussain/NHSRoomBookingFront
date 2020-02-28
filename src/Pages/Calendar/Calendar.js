<<<<<<< HEAD
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Calendar.css";

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    listUpcomingEvents();
  } else {
    calendarEvents = [];
  }
}

var calendarEvents = [];
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
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
        calendarEvents.push([event.summary, event.start.date]);
      }
    } else {
      //return.
    }
  });
}

// Lists the events.
function List() {
  /*return calendarEvents.map((data,i) => {
    return (
        <li key={i}>{data}</li>
    )
  })*/

  return calendarEvents.map(event => {
    return <ul key={event}>
      {event.map(info => {
        return <li key={info}>{info}</li>
      })}
    </ul>
  })
}

/*
TODO - Pass in a date, loop through calendarEvents[i][1] if date = calendarEvents[i][1] return calendarEvents[i][0]
 */
function CheckDay(d){
   for(var i=0; i<calendarEvents.length; i++){
      if({d}.d===calendarEvents[i][1]){
        return <p>{calendarEvents[i][0]}</p>
      }
   }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      year: 0,
      leapYear: false,
      calendarRows: 5,
      dates: [],
      content: [],
      events: [],
      signedIn: false,
    };
    // Bind Functions to button press.
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this)
    this.handleSignoutClick = this.handleSignoutClick.bind(this)
    
  }

  //Functions Called On Load
  componentDidMount(){
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          CLIENT_ID,
        scope: SCOPES
      });
    });
    handleClientLoad();
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
    this.currentYear()
    this.currentMonth()
    this.checkLeapYear()
    this.calendarRows()
  }

  // Refresh the components state (needed!!!)
  tick() {
    this.setState({
      date: new Date()
    });
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  //Used on button press to load in the next month
  nextMonth(){
    this.checkLeapYear()
    this.setState({
      month: this.state.month > 10 ? 0 : this.state.month + 1,
      year: this.state.month > 10 ? this.state.year + 1 : this.state.year,
      calendarRows: this.nextMonthCheck() ? 6 : 5
    });
  }
  
  // Used on button press to load in the previous month
  previousMonth(){
    this.checkLeapYear()
    this.setState({
      month: this.state.month < 1 ? 11 : this.state.month - 1,
      year: this.state.month < 1 ? this.state.year - 1 : this.state.year,
      calendarRows: this.prevMonthCheck() ? 6 : 5
    });
  }

  // Check the previous month values, to determine how many rows need to be shown on the calendar
  prevMonthCheck(){
    var checkMonth = this.state.month < 1 ? 11 : this.state.month - 1
    var checkYear = this.state.month < 1 ? this.state.year - 1 : this.state.year
    var firstDay = (new Date(checkYear, checkMonth)).getDay()
    return (firstDay === 5 && DaysInMonth[checkMonth] >= 30) || 
    (firstDay === 6 && DaysInMonth[checkMonth] > 29)
  }

  // Check the next month value, to determine how many rows need to be shown on the calendar
  nextMonthCheck(){
    var checkMonth = this.state.month > 10 ? 0 : this.state.month + 1;
    var checkYear = this.state.month > 10 ? this.state.year - 1 : this.state.year
    var firstDay = (new Date(checkYear, checkMonth)).getDay()
    return (firstDay === 5 && DaysInMonth[checkMonth] >= 30) || 
    (firstDay === 6 && DaysInMonth[checkMonth] > 29)
  }

  // Get the current year
  currentYear(){
    this.setState({
      year: new Date().getFullYear()
    });
  }

  // Get the current month
  currentMonth(){
    this.setState({
      month: new Date().getMonth()
    });
  }
  
  // Check if the viewing year is a leap year.
  checkLeapYear(){
    this.setState({
      leapYear: this.state.year % 4 === 0 ? true : false
    });
  }

  /* Determines how many rows will be needed for the calendar
  Default 5: 
  Six if First day of the month is: 
  Friday & days in month is >=30 or
  Saturday & days in month is > 29

  Or Days in Month + FirstDayValue === 35 then 6 Rows
  Or RoundUp((Days in Month + FirstDayValue + 1) / 7)
  */
  calendarRows(){
    var firstDay = (new Date(this.state.year, this.state.month)).getDay()
    let date = new Date(this.state.year, this.state.month), m = date.getMonth();
    //console.log("First Day: " + firstDay)
    //console.log("Month: " + m)
    //console.log("Days in Month: " + DaysInMonth[m])
    this.setState({
      calendarRows: (firstDay === 5 && DaysInMonth[m] >= 30) || (firstDay === 6 && DaysInMonth[m] > 29) ? 6 : 5
    });
  }

  // Component to display the calendar.
  calendarContent(){
    return [...Array(this.state.calendarRows)].map((e, r) => {
      var firstDay = (new Date(this.state.year, this.state.month)).getDay();
      var days = DaysInMonth[this.state.month];
      if(this.state.leapYear && this.state.month === 1){
        days = 29;
      }
      var day = r * 7;
      var prevDays = 0;
      if(this.state.month-1 === -1){
        prevDays = DaysInMonth[0];
      } else {
        prevDays = DaysInMonth[this.state.month-1];
      }

      var nextDays = (new Date(this.state.year, this.state.month+1)).getDay();
      return <tr key={r}>{[...Array(7)].map((e, i) => {
        day+=1;
        return <th key={i}>{day <= days + firstDay && day > firstDay ? day - firstDay : day >= days + firstDay ? i+1 - nextDays : (prevDays-firstDay+1)+i}
        {CheckDay(new Date(this.state.year, day >= days + firstDay ? this.state.month+1 : this.state.month, day <= days + firstDay && day > firstDay ? day - firstDay : day >= days + firstDay ? i+1 - nextDays : (prevDays-firstDay+1)+1).toISOString().split('T')[0])}
        </th>
      })}</tr>
    })
  }

  state = { events: calendarEvents }
  render(){
    return(
      <div className="Calendar">
        {isSignedIn 
        ?<button id="signout_button" onClick={this.handleSignoutClick}>Sign Out</button>
        :<button id="authorize_button" onClick={this.handleAuthClick}>Authorize</button>}
        <List />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan="7">
              <button className="Previous" onClick={this.previousMonth}>Prev</button>
              {Months[this.state.month]} - {this.state.year}.
              <button className="Next" onClick={this.nextMonth}>Next</button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {this.calendarContent()}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
=======
import Calendar from 'react-calendar';
import React from 'react';

class MyCalendar extends React.Component {
    render() {
      return (
          <Calendar/>
      );
    }
}

export default MyCalendar;
>>>>>>> origin/simpleCalendar
