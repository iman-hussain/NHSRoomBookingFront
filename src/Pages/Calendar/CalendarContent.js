/*
  Developed by Liam Penn - 1415065
  Use of Google Calendar API Quickstart to connect to the API with slight changes
*/
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar.css";
import MeetingList, { Events } from "../MeetingList/MeetingList.js";
// Used to store events collected from the calendar.
var calendarEvents = [];

/*
Passes in a date - if the date is in the calendar add a circle to the calendar cell, 
checks for multiple events on the same day and adds the appropriate amount of circles.
  calendarEvents[i][1] is the event time/date
  calendarEvents[i][2] is the event colour 
*/
const CheckDay = (d) => {
    var events = [];
    calendarEvents = Events;
    console.log(calendarEvents);
    if (calendarEvents.length >= 0) {
      for (var i = 0; i < calendarEvents.length; i++) {
        if ({ d }.d === calendarEvents[i][1].slice(0, 10).replace("T", " ")) {
          console.log(calendarEvents[i][1].slice(0, 10).replace("T", " "));
          events.push(calendarEvents[i][2]);
        }
      }
  
      return (
        <div>
          {events.map(function (name, index) {
            console.log(calendarEvents[index]);
            return (
              <span
                className="circle"
                style={{ background: events[index] }}
                key={index}
              ></span>
            );
          })}
        </div>
      );
    }
  };
  
  const OnSelectedRow = (e) => {
    var cellElements = document.getElementsByClassName("Day");
    for (var i = 0; i < cellElements.length; i++) {
      cellElements[i].style.backgroundColor = "#f5f6ff";
      cellElements[i].style.color = "black";
    }
    e.currentTarget.style.background = "#ef5350";
    e.currentTarget.style.color = "white";
  };

const CalendarContent = (year, month, firstDay, currentDate, daysInMonth) => {
    const rows = Math.ceil((daysInMonth + firstDay) / 7);
    var previousDay = firstDay + 1;
    return [...Array(rows)].map((e, r) => {
      // Multiple days by 7 for each row
      var day = r * 7;
      day = day - firstDay;
      return (
        <tr key={r}>
          {[...Array(7)].map((e, i) => {
            //Increment day after inserting a cell.
            if (previousDay > 0) {
              const prevDays = 32 - new Date(year, month - 1, 32).getDate();
              day = prevDays - previousDay + 1;
              previousDay = previousDay - 1;
              if (previousDay == 0) {
                day = 0;
              }
            } else if (day >= daysInMonth) {
              day = 0;
            }
            day += 1;
            return (
              <th key={i} className="Day" onClick={(e) => OnSelectedRow(e)}>
                {day}
                {CheckDay(new Date(year, month, day).toISOString().split("T")[0])}
              </th>
            );
          })}
        </tr>
      );
    });
  };
export default CalendarContent;