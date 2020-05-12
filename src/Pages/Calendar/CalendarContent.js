/*
  Developed by Liam Penn - 1415065
  Use of Google Calendar API Quickstart to connect to the API with slight changes
*/
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar.css";
import { Events } from "../MeetingList/MeetingList.js";
import { useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps

/*
Passes in a date - if the date is in the calendar add a circle to the calendar cell, 
checks for multiple events on the same day and adds the appropriate amount of circles.
  calendarEvents[i][1] is the event time/date
  calendarEvents[i][2] is the event colour 
*/
const CheckDay = (d) => {
  var eventColors = [];

  if (Events.length >= 0) {
    for (var i = 0; i < Events.length; ++i) {
      //console.log(d)
      var calendarDate = new Date(Events[i][0])
      var checkingDate = new Date(d)
      var altDate = new Date(checkingDate)
      altDate.setHours(0,0,0,0)
      if (calendarDate.getTime() == checkingDate.getTime() || calendarDate.getTime() == altDate.getTime()) {
        eventColors.push(Events[i][2]);
      }
    }

    /* d === Events[i][0].slice(0, 10).replace("T", " ")*/
    return (
      <div>
        {eventColors.map(function (name, index) {
          return (
            <span
              className="circle"
              style={{ background: eventColors[index] }}
              key={index}
            ></span>
          );
        })}
      </div>
    );
  }
};

/*Change the style of the selected day*/
const OnSelectedRow = (e) => {
  var cellElements = document.getElementsByClassName("Day");
  for (var i = 0; i < cellElements.length; i++) {
    cellElements[i].style.backgroundColor = "#f5f6ff";
    cellElements[i].style.color = "black";
  }
  e.currentTarget.style.background = "#ef5350";
  e.currentTarget.style.color = "white";
};

/*Display the currently viewed month and any events*/
const CalendarContent = (year, month, firstDay, currentDate, daysInMonth) => {
  const rows = Math.ceil((daysInMonth + firstDay) / 7);
  var previousDay = firstDay + 1;

  const [events, setEvents] = useState(null);

  const bookings = useSelector(state => state.userInfo.bookings);

  useEffect(() => {
    let calendarEvents = [];
    if (bookings && !!bookings.length) {
      for (var i = 0; i < bookings.length; i++) {
        calendarEvents.push([bookings[i][1], bookings[i][2], bookings[i][5]]);
      }
    }
    setEvents(calendarEvents)
  }, [])

  return [...Array(rows)].map((e, r) => {
    // Multiple days by 7 for each row
    var day = r * 7;
    var thisMonth = month;
    var thisYear = year;
    day = day - firstDay;
    return (
      <tr key={r}>
        {[...Array(7)].map((e, i) => {
          //Increment day after inserting a cell.
          if (previousDay > 0) {
            const prevDays = 32 - new Date(year, month - 1, 32).getDate();
            day = prevDays - previousDay + 1;
            previousDay = previousDay - 1;
            if (month === 0) {
              thisMonth = 11;
              thisYear = year - 1;
            } else {
              thisMonth = month - 1;
              thisYear = year;
            }

            if (previousDay == 0) {
              day = 0;
              thisMonth = month;
              thisYear = year;
            }
          } else if (day >= daysInMonth) {
            day = 0;
            if (month === 11) {
              thisMonth = 0;
              thisYear = year + 1;
            } else {
              thisMonth = month + 1;
              thisYear = year;
            }
          }
          day += 1;

          return (
            <th key={i} className="Day" onClick={(e) => OnSelectedRow(e)}>
              {day}
              {CheckDay(
                new Date(thisYear, thisMonth, day+1).toISOString().split("T")[0])}
            </th>
          );
        })}
      </tr>
    );
  });
};
export default CalendarContent;