import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let DisplayMonth = 0;
let DisplayYear = 0;
/*
TODO - Display Year - Month - Current Day - Leap Year - Next / Previous button
*/

/* Returns the Current Year - Used for start up of calendar*/
function currentYear(){
  DisplayYear = new Date().getFullYear();
}

/* Returns the Current Month - Used for start up of calendar*/
function currentMonth(){
 DisplayMonth = new Date().getMonth();
}

function setUp(){
  currentYear()
  currentMonth()
}

/* Determines how many rows will be needed for the calendar
Default 5: 
Six if First day of the month is: 
Thursday & days in month is 31 or
Friday & days in month is >=30 or
Saturday & days in month is > 29
*/
function calendarRows(){
  return 5;
}

/*Change the amount of days shown in February if the currently viewed year is a leap year.*/
function checkLeapYear(){
  let date = new Date(), y = date.getFullYear(), m = date.getMonth();
  let leapYear = m === 1 && y % 4 === 0;
  if (leapYear) {
    DaysInMonth[1] = 29;
  } else {
    DaysInMonth[1] = 28;
  }
}

/*Used to move the calendar forward by a month*/
function nextMonth(){
  DisplayMonth += 1;
  console.log(DisplayMonth);
}

/*Used to move the calendar back by a month*/
function previousMonth(){
  DisplayMonth -= 1;
  console.log(DisplayMonth);
}

function App(){
  setUp();
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="7">
              <button onClick={previousMonth}>Previous</button>
              Calendar - {Months[DisplayMonth]} - {DisplayYear}.
              <button onClick={nextMonth}>Next</button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>{[...Array(calendarRows())].map((e,r) => {
          let date = new Date(), y = date.getFullYear(), m = date.getMonth();
          //let lastDay = new Date(y, m + 1, 0);
          let firstDay = (new Date(y, m)).getDay();
          let leapYear = m === 1 && y % 4 === 0;
          let days = DaysInMonth[m];
          if (leapYear) {
            days = 29;
          }
          let day = r * 7;
          return <tr key={r}>{[...Array(7)].map((e, i) => {
            day += 1;
              return <th key={i}>{day <= days+firstDay && day > firstDay ? day-firstDay : ''}
                    <p>{day <= days+firstDay ? "Content" : ''}</p>
                    </th>
            })}</tr>
        })}
        </tbody>
      </Table>
    );
}

export default App;


/*import React from 'react';
import Calendar from 'react_google_calendar'

/*
TODO: Create Calander Component - Connect to Google API
/*

const calendar_configuration = {
    api_key: 'AIzaSyBahaMZOI8jFnjLC9SPgLBJqwxNt37vSQk'
    ,
    calendars: [
      {
        name: 'demo',
        url: 'exampleURL@group.calendar.google.com'
      }
    ],
    dailyRecurrence: 700,
    weeklyRecurrence: 500,
    monthlyRecurrence: 20
}

class MyApp extends React.Component {
    constructor(props) {
      super(props)
        this.state = {
          events: []
        }
    }
}

function Calendar2(){
    return (
        <div>
        <Calendar
          events={this.state.events}
          config={calendar_configuration} />
      </div>
    );
}

export default Calendar2;
*/