import React from 'react';
import './MettingList.css';

/*
TODO - GetCalendarEvents? From GoogleLogin? OR Send into function from Calendar?
TODO - Style Circle 
*/
function MeetingList() {

    var calendarEvents;
    return calendarEvents.map((event, i) => {
      return <div key={event}>
        <p><span className="circle" style={{background: calendarEvents[i][2]}}></span>&nbsp;&nbsp;
        {event.join(' - ')}</p>
      </div>
    })
  }
export default MeetingList;