/*
  Developed by Liam Penn - 1415065
*/

import React, {useEffect} from 'react';
import './MettingList.css';
import {GoogleLogin, events} from '../../components/GoogleLogin.js';
import { useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps

// Joins the details in each event and display a circle with a randomly generated color.
// calendarEvents[i][0] is the events title
// calendarEvents[i][1] is the events date or date time
// calendarEvents[i][2] is the color corresponding to the event, used to visually match events in the calendar with the list.

let Events = [];


// Sort the bookings by date, closest first.
function sortBookingsByDate(a, b) {
  if(a[1] === b[1]) {
      return 0;
  } else {
      return (a[1] < b[1]) ? -1 : 1;
  }
}

const MeetingList = () => {
  let bookings = useSelector(state => state.userInfo.bookings);
  var calendarEvents = [];

  if (bookings[0] && bookings[0].length > 0) {
    console.log(bookings)
    bookings = bookings.slice().sort(sortBookingsByDate);
    for (var i = 0; i < bookings.length; i++) {
      calendarEvents.push([bookings[i][1], bookings[i][2], bookings[i][5]]);
    }
  }

  Events = calendarEvents;
  console.log(Events)
  if(calendarEvents && !!calendarEvents){
  return calendarEvents.map((event, i) => {
    var calendarDate = calendarEvents[i][1].slice(0, 19).replace('T', ' ')
    var nDate = new Date(calendarDate);
    console.log(calendarEvents[i][3])
    nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
    //calendarEvents[i][1].slice(0, 19).replace('T', ' ')
    return (
      <tbody key={event}>
        <tr className="meetingList">
          <td style={{width: "10%"}} className="center"><div className="circle" style={{background: calendarEvents[i][2]}}></div></td>
          <td style={{width: "45%"}} >{calendarEvents[i][0]}</td>
          <td style={{width: "45%"}} >{nDate.toDateString() + ' ' + nDate.toLocaleTimeString()}</td>
        </tr>        
      </tbody>
    )
  })  } else {
    return <tbody>
    <tr >
    </tr>        
  </tbody>
  }
}

export default MeetingList;

export {Events}