/*
  Developed by Liam Penn - 1415065
  Use of Google Calendar API Quickstart to connect to the API with slight changes
*/
import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar.css";
import { GoogleLogin } from "../../components/GoogleLogin.js";
import CalendarList from "./CalendarList";
import CalendarContent from "./CalendarContent";
const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [firstDay, setFirstDay] = useState(new Date(year, month).getDay());
  const [currentDate, setCurrentDay] = useState(new Date().getUTCDate());
  const [daysInMonth, setDaysInMonth] = useState(
    32 - new Date(year, month, 32).getDate()
  );

  useEffect(() => {
    var cellElements = document.getElementsByClassName("Day");
    cellElements[currentDate + firstDay - 1].style.backgroundColor = "#ef5350";
    cellElements[currentDate + firstDay - 1].style.color = "white";
  }, []);

  useEffect(() => {
    setFirstDay(new Date(year, month).getDay());
    setDaysInMonth(32 - new Date(year, month, 32).getDate());
  }, [month]);

  return (
    <div className="Calendar">
      <GoogleLogin />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan="7">
              <div className="calendarTitleContainer">
                <Button
                  variant="secondary"
                  className="Previous"
                  onClick={() => {
                    setYear(month == 0 ? year - 1 : year);
                    setMonth(month == 0 ? 11 : month - 1);
                  }}
                >
                  Prev
                </Button>
                <h4 className="calendarTitle">
                  {new Date(year, month).toLocaleString("default", {
                    month: "long",
                  })}
                </h4>
                <Button
                  variant="secondary"
                  className="Next"
                  onClick={() => {
                    setYear(month == 11 ? year + 1 : year);
                    setMonth(month == 11 ? 0 : month + 1);
                  }}
                >
                  Next
                </Button>
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
          {CalendarContent(year, month, firstDay, currentDate, daysInMonth)}
        </tbody>
      </Table>
      <CalendarList />
    </div> // End Of Calendar
  );
};

export default Calendar;