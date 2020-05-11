import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../BookingHistory/BookingHistory.css";
import {
  GoogleLogin,
  events,
  SendEvent,
  getList,
} from "../../components/GoogleLogin.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps

//Checks all bookings to see if any are on the current day, then outputs them
const BookingsToday = (calendarEvents, date) => {
  //console.log(calendarEvents)
  if (calendarEvents[0] && calendarEvents[0].length > 0) {
    return calendarEvents.map((event, i) => {
      var calendarDate = calendarEvents[i][2].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      if (calendarEvents[i][1].slice(0, 10) === date) {
        return (
          <tbody key={event}>
            <tr>
              <td>{calendarEvents[i][0]}</td>
              <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString()}</td>
              <td>
                <Link to="/viewBooking/">Details</Link>
              </td>
            </tr>
          </tbody>
        );
      } else {
        return "";
      }
    });
  }
};

// Sort the bookings by date, closest first.
function sortBookingsByDate(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] < b[1] ? -1 : 1;
  }
}

// Check all bookings to see if any are after the current day, then outputs them
const NextBookings = (bookings, date) => {
  if (bookings[0] && bookings[0].length > 0) {
    bookings = bookings.slice().sort(sortBookingsByDate);

    return bookings.map((event, i) => {
      var calendarDate = bookings[i][2].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      if (bookings[i][1].slice(0, 10) > date) {
        var calendarDate = bookings[i][1].slice(0, 10);
        var diff = Math.floor(
          (Date.parse(calendarDate) - Date.parse(date)) / 86400000
        );
        return (
          <tbody key={event}>
            <tr>
              <td>{bookings[i][0]}</td>
              <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString()}</td>
              <td>{diff}</td>
              <td>
                <Link to="/">Details</Link>
              </td>
            </tr>
          </tbody>
        );
      } else {
        return "";
      }
    });
  }
};

// Checks all bookings to see if any are before the current day and outputs them.
const PreviousBookings = (bookings, date) => {
  if (bookings[0] && bookings[0].length > 0) {
    bookings = bookings.slice().sort(sortBookingsByDate);
    return bookings.map((event, i) => {
      var calendarDate = bookings[i][2].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      if (bookings[i][1].slice(0, 10) < date) {
        return (
          <tbody key={event}>
            <tr>
              <td>{bookings[i][0]}</td>
              <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString()}</td>
              <td>
                <Link to="/">Details</Link>
              </td>
            </tr>
          </tbody>
        );
      } else {
        return "";
      }
    });
  }
};

const BookingTable = () => {
  const bookings = useSelector((state) => state.userInfo.bookings);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [date, setDate] = useState(null);
  console.log(calendarEvents);

  useEffect(() => {
    setCalendarEvents(events);
  }, []);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, [calendarEvents]);

  return (
    <div className="List">
      <div className="title">
        <a href="/" id="backIcon">
          <h4>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </h4>
        </a>
        <h4>Booking History</h4>
      </div>
      <GoogleLogin show={false} />
      <div className="HistoryList">
        <h3>Bookings Today</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="Event">Event Name</th>
              <th className="Date">Date</th>
              <th className="Details">Details</th>
            </tr>
          </thead>
          {BookingsToday(bookings, date)}
        </Table>
        <h3>Next Bookings</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="Event">Event Name</th>
              <th className="Date">Date</th>
              <th className="Details">Days to Event</th>
              <th className="Details">Details</th>
            </tr>
          </thead>
          {NextBookings(bookings, date)}
        </Table>
        <h3>Previous Bookings</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="Event">Event Name</th>
              <th className="Date">Date</th>
              <th className="Details">Details</th>
            </tr>
          </thead>
          {PreviousBookings(bookings, date)}
        </Table>
      </div>
    </div>
  );
};

export default BookingTable;