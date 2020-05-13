/*
  Developed by Liam Penn - 1415065
  Display the booking history, today, previous and next bookings. 
  Link to view booking on each booking.
*/
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "../BookingHistory/BookingHistory.css";
import {
  GoogleLogin,
  events,
} from "../../components/GoogleLogin.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps
import GetBookingInfo from '../../API/getBookingInfo';

const getInfo = async (bookings) => {
  var res = []
  for (var i = 0; i < bookings.length; i++) {
    await GetBookingInfo(bookings[i][0]).then( result => {
      res.push(result)
    })
  }
  return res;
}

//Checks all bookings to see if any are on the current day, then outputs them
const BookingsToday = (calendarEvents, date) => {
  console.log(calendarEvents)
  if (calendarEvents[0] && calendarEvents[0].length > 0) {
    return calendarEvents.map((event, i) => {
      var calendarDate = calendarEvents[i][0].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      var endMeeting = new Date(calendarDate);
      endMeeting.setTime((endMeeting.getTime() - nDate.getTimezoneOffset() * 60 * 1000) + (60 * 60 * 1000 * calendarEvents[i][3][9]))
      if (calendarEvents[i][1].slice(0, 10) === date) {
        return (
          <tbody key={event}>
            <tr>
            <td>{calendarEvents[i][3][0] + ' - Floor ' + calendarEvents[i][3][3] + ' - Room ' + calendarEvents[i][4] + '\nHosted By: ' + calendarEvents[i][3][10]}</td>
            <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' to ' + endMeeting.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>
              <Link to={`/viewBooking/${calendarEvents[i][3][11]}`}>Details</Link>
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
      var calendarDate = bookings[i][1].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      var endMeeting = new Date(calendarDate);
      endMeeting.setTime((endMeeting.getTime() - nDate.getTimezoneOffset() * 60 * 1000) + (60 * 60 * 1000 * bookings[i][3][9]))

      if (bookings[i][1].slice(0, 10) > date) {
        var calendarDate = bookings[i][1].slice(0, 10);
        var diff = Math.floor(
          (Date.parse(calendarDate) - Date.parse(date)) / 86400000
        );
        return (
          <tbody key={event}>
            <tr>
            <td>{bookings[i][3][0] + ' - Floor ' + bookings[i][3][3] + ' - Room ' + bookings[i][4] + '\nHosted By: ' + bookings[i][3][10]}</td>
            <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' to ' + endMeeting.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
              <td>{diff}</td>
              <td>
              <Link to={`/viewBooking/${bookings[i][3][11]}`}>Details</Link>
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
      var calendarDate = bookings[i][1].slice(0, 19).replace('T', ' ')
      var nDate = new Date(calendarDate);
      nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
      var endMeeting = new Date(calendarDate);
      endMeeting.setTime((endMeeting.getTime() - nDate.getTimezoneOffset() * 60 * 1000) + (60 * 60 * 1000 * bookings[i][3][9]))

      if (bookings[i][1].slice(0, 10) < date) {
        return (
          <tbody key={event}>
            <tr>
            <td>{bookings[i][3][0] + ' - Floor ' + bookings[i][3][3] + ' - Room ' + bookings[i][4] + '\nHosted By: ' + bookings[i][3][10]}</td>
            <td>{nDate.toDateString() + ' ' + nDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' to ' + endMeeting.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>
            <Link to={`/viewBooking/${bookings[i][3][11]}`}>Details</Link>
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
  const [bookingInfo, setBookingInfo] = useState([]);
  const [info, setInfo] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (bookings[0] && bookings[0].length > 0) {
      const fetchData = async() => {
        const result = await getInfo(bookings);
        setInfo(result)
      }
      fetchData();
    }
  }, [])

  useEffect(() => {
    if(!firstLoad){
      var calEvents = []
      if (bookings[0] && bookings[0].length > 0) {
        for (var i = 0; i < bookings.length; i++) {
          calEvents.push([bookings[i][1], bookings[i][2], bookings[i][5], info[i][0], bookings[i][3]]);
        }
      }
      setBookingInfo(calEvents)
    } 
    setFirstLoad(false);
    
  }, [info])

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
          {BookingsToday(bookingInfo, date)}
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
          {NextBookings(bookingInfo, date)}
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
          {PreviousBookings(bookingInfo, date)}
        </Table>
      </div>
    </div>
  );
};

export default BookingTable;