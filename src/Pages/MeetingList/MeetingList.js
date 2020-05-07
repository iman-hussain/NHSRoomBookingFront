/*
  Developed by Liam Penn - 1415065
*/

import React from 'react';
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
  const bookings = useSelector(state => state.userInfo.bookings);
  bookings.sort(sortBookingsByDate);
  var calendarEvents = [];
  if (bookings && bookings.length > 1) {
    for (var i = 0; i < bookings.length; i++) {
      calendarEvents.push([bookings[i][1], bookings[i][2], bookings[i][5]]);
    }
  }

  Events = calendarEvents;
  console.log(Events)
  if(calendarEvents && !!calendarEvents){
  return calendarEvents.map((event, i) => {
    return (
      <tbody key={event}>
        <tr >
          <td className="center"><div className="circle" style={{background: calendarEvents[i][2]}}></div></td>
          <td>{calendarEvents[i][0]}</td>
          <td>{calendarEvents[i][1].slice(0, 19).replace('T', ' ')}</td>
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