import React from 'react';
import './MettingList.css';
import {GoogleLogin, events} from '../../components/GoogleLogin.js';

/*
TODO - GetCalendarEvents? From GoogleLogin? OR Send into function from Calendar?
TODO - Style Circle 
*/

// Joins the details in each event and display a circle with a randomly generated color.
function MeetingList() {
  var calendarEvents = events;
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
  })
}

export default MeetingList;