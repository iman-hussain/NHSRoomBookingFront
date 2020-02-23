import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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
    };
    // Bind Functions to button press.
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
  }

  //Functions Called On Load
  componentDidMount(){
    this.currentYear()
    this.currentMonth()
    this.checkLeapYear()
    this.calendarRows()
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
    console.log("First Day: " + firstDay)
    console.log("Month: " + m)
    console.log("Days in Month: " + DaysInMonth[m])
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
        <p>{day <= days + firstDay ? "Content" : "Content"}</p>
        </th>
      })}</tr>
    })
  }

  /*Get Previous Month Amount*/

  render(){
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="7">
              <button onClick={this.previousMonth}>Previous</button>
              Calendar - {Months[this.state.month]} - {this.state.year}.
              <button onClick={this.nextMonth}>Next</button>
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
        <tbody>
          {this.calendarContent()}
        </tbody>
      </Table>
    );
  }
}

export default App;