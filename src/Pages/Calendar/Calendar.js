/*Developed by Liam Penn - 
  Use of Google Calendar API Quickstart to connect to the API with slight changes
  */
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Calendar.css";
import {GoogleLogin, events} from '../../components/GoogleLogin.js';

// Months used to display the viewed month on the calendar.
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
// DaysInMonth used to get how many days are in each month - Future development could remove this using new Date(year, month, 32) - .GetDate()
let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// Used to store events collected from the calendar.
var calendarEvents = [];

// Joins the details in each event and display a circle with a randomly generated color.
function List() {
  return calendarEvents.map((event, i) => {
    return (
      <tbody key={event}>
        <tr >
          <td className="center"><div className="circle" style={{background: calendarEvents[i][2]}}></div></td>
          <td>{calendarEvents[i][0]}</td>
          <td>{calendarEvents[i][1]}</td>
        </tr>        
      </tbody>
    )
  })
}

/*
Passes in a date - if the date is in the calendar add a circle to the calendar cell.
*/
function CheckDay(d){
   for(var i=0; i<calendarEvents.length; i++){
      if({d}.d===calendarEvents[i][1]){
        console.log({d}.d)
        return <div>
          <span className="circle" style={{background: calendarEvents[i][2]}}></span>
        </div>
      }
   }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 0, // Current viewed month
      year: 0, // Current viewed year
      leapYear: false, // Is Current viewed year a leap year
      calendarRows: 5, // Default amount of rows needed
      dates: [], // Stores dates - !Currently not used
      content: [], // Stores Content - !Currently not used
      events: [], // Stores events - !Currently not used
      signedIn: false, // Stores whether the user is signedIn - !Currently not used
    };

    // Bind Functions to button press.
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    }

  //Functions Called On Load
  componentDidMount(){
    // Start the tick event every 5s - !Used to continously display data in calendar.
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
    this.currentYear() // Sets current year on mount
    this.currentMonth() // Sets current month on mount
    this.checkLeapYear() // Sets leapyear on mount
    this.calendarRows() // Sets amount of rows to display on mount
    this.onStartCell()
    this.setState({events: GoogleLogin.events});
  }

  // Refresh the components state !Required!
  tick() {
    this.setState({
      date: new Date()
    });
    calendarEvents = events;
  }

  /*
    Used on button press to load in the next month - Check for LeapYear
  */
  nextMonth(){
    this.checkLeapYear()
    this.setState({
      month: this.state.month > 10 ? 0 : this.state.month + 1,
      year: this.state.month > 10 ? this.state.year + 1 : this.state.year,
      calendarRows: this.nextMonthCheck() ? 6 : 5
    });
  }
  
  /*
    Used on button press to load in the previous month - Check for LeapYear
  */
  previousMonth(){
    this.checkLeapYear()
    this.setState({
      month: this.state.month < 1 ? 11 : this.state.month - 1,
      year: this.state.month < 1 ? this.state.year - 1 : this.state.year,
      calendarRows: this.prevMonthCheck() ? 6 : 5
    });
  }

  /* 
    Check the previous month values, to determine how many rows need to be shown on the calendar
  */
  prevMonthCheck(){
    var checkMonth = this.state.month < 1 ? 11 : this.state.month - 1
    var checkYear = this.state.month < 1 ? this.state.year - 1 : this.state.year
    var firstDay = (new Date(checkYear, checkMonth)).getDay()
    return (firstDay === 5 && DaysInMonth[checkMonth] >= 30) || 
    (firstDay === 6 && DaysInMonth[checkMonth] > 29)
  }

  /*
    Check the next month value, to determine how many rows need to be shown on the calendar
  */
  nextMonthCheck(){
    var checkMonth = this.state.month > 10 ? 0 : this.state.month + 1;
    var checkYear = this.state.month > 10 ? this.state.year - 1 : this.state.year
    var firstDay = (new Date(checkYear, checkMonth)).getDay()
    return (firstDay === 5 && DaysInMonth[checkMonth] >= 30) || 
    (firstDay === 6 && DaysInMonth[checkMonth] > 29)
  }

  /* 
    Get the current year 
  */
  currentYear(){
    this.setState({
      year: new Date().getFullYear()
    });
  }

  /* 
    Get the current month
  */
  currentMonth(){
    this.setState({
      month: new Date().getMonth()
    });
  }
  
  /*
    Check if the viewing year is a leap year.
  */
  checkLeapYear(){
    this.setState({
      leapYear: this.state.year % 4 === 0 ? true : false
    });
  }

  /* 
    Determines how many rows will be needed for the calendar
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
    this.setState({
      calendarRows: (firstDay === 5 && DaysInMonth[m] >= 30) || (firstDay === 6 && DaysInMonth[m] > 29) ? 6 : 5
    });
  }

  /*
    Component to display the calendar.
  */
  calendarContent(){
    return [...Array(this.state.calendarRows)].map((e, r) => {
      var firstDay = (new Date(this.state.year, this.state.month)).getDay(); // Get FirstDay
      var days = DaysInMonth[this.state.month]; // Get Amount of Days in viewed month
      // Check for leap year if current month is february.
      if(this.state.leapYear && this.state.month === 1){
        days = 29;
      }
      var day = r * 7; // Multiple days by 7 for each row
      // Get previous days to fill out missing calendar cells.
      var prevDays = 0;
      if(this.state.month-1 === -1){
        prevDays = DaysInMonth[0];
      } else {
        prevDays = DaysInMonth[this.state.month-1];
      }

      // Get next days to fill out missing calendar cells.
      var nextDays = (new Date(this.state.year, this.state.month+1)).getDay();
      return <tr key={r}>{[...Array(7)].map((e, i) => {
        //Increment day after inserting a cell.
        day+=1;
        return <th key={i} className="Day" onClick={this.onSelectedRow.bind(this)}>{day <= days + firstDay && day > firstDay ? day - firstDay 
                : day >= days + firstDay ? i+1 - nextDays
                : (prevDays-firstDay+1)+i}
        {CheckDay(new Date( this.state.year, day >= days + firstDay ? this.state.month+1 
                          : day - firstDay <= 0 ? this.state.month-1 
                          : this.state.month, day <= days + firstDay && day > firstDay ? day - firstDay 
                          : day >= days + firstDay ? i+1 - nextDays 
                          : (prevDays-firstDay+1)+1).toISOString().split('T')[0])}
        </th>
      })}</tr>
    })
  }

  /*
    Set the selected cells color. 
  */
  onSelectedRow(clickEvent){
    var cellElements = document.getElementsByClassName("Day");
    for (var i = 0; i < cellElements.length; i++) {
        cellElements[i].style.backgroundColor= "#f5f6ff";
        cellElements[i].style.color= "black";
        //cellElements[i].style.boxShadow = "inset 0px 0px 0px 0px #b8b6b8";
  
    }
    clickEvent.currentTarget.style.background = "#ef5350";
    clickEvent.currentTarget.style.color = "white";
    //clickEvent.currentTarget.style.boxShadow = "inset 0px 0px 0px 5px #b8b6b8";
  }

  /*
      Called on mount, set the current days cell to selected.
  */
  onStartCell() {
    var firstDay = (new Date(this.state.year, this.state.month)).getDay(); // Get FirstDay
    console.log(firstDay);
    var extraDays = 5;
    var currentDate = new Date().getDate();
    var cellElements = document.getElementsByClassName("Day");
    cellElements[currentDate + extraDays].style.backgroundColor= "#ef5350";
    cellElements[currentDate + extraDays].style.color= "white";
  }

  state = { events: calendarEvents }
  render(){
    return(
      <div className="Calendar">
        <GoogleLogin/>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan="7">
                <div className="calendarTitleContainer">
                  <Button className="Previous" onClick={this.previousMonth}>Prev</Button>
                  <h4 className="calendarTitle">{Months[this.state.month]} - {this.state.year}</h4>
                  <Button className="Next" onClick={this.nextMonth}>Next</Button>
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr className="Days">
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
        <div className="List">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="center">#</th>
                <th>Event Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <List/>
          </Table>
        </div>
      </div> // End Of Calendar
    );
  }
}

export default App;
