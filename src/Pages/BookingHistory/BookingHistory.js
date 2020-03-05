import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../BookingHistory/BookingHistory.css";
import { GoogleLogin, events, sendEvent, getList} from '../../components/GoogleLogin.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

//Checks all bookings to see if any are on the current day, then outputs them
function BookingsToday() {
    var date = new Date().toISOString().split('T')[0]
    var calendarEvents = events;
    return calendarEvents.map((event, i) => {
        if (calendarEvents[i][1].slice(0, 10) === date) {
            return (
                <tbody key={event}>
                    <tr>
                        <td>{calendarEvents[i][0]}</td>
                        <td>{calendarEvents[i][1].slice(0, 19).replace('T', ' ')}</td>
                        <td><Link to="/">Details</Link></td>
                    </tr>
                </tbody>
            )
        }
    });
}

// Check all bookings to see if any are after the current day, then outputs them
function NextBookings() {
    var date = new Date().toISOString().split('T')[0]
    var calendarEvents = events;
    return calendarEvents.map((event, i) => {
        if (calendarEvents[i][1].slice(0, 10) > date) {
            var calendarDate = calendarEvents[i][1].slice(0, 10);
            var diff = Math.floor((
                Date.parse(calendarDate) - Date.parse(date)
            ) / 86400000);
            return (
                <tbody key={event}>
                    <tr >
                        <td>{calendarEvents[i][0]}</td>
                        <td>{calendarEvents[i][1].slice(0, 19).replace('T', ' ')}</td>
                        <td>{diff}</td>
                        <td><Link to="/">Details</Link></td>
                    </tr>
                </tbody>
            )
        }
    });
}

// Checks all bookings to see if any are before the current day and outputs them.
function PreviousBookings() {
    var date = new Date().toISOString().split('T')[0]
    var calendarEvents = events;
    return calendarEvents.map((event, i) => {
        if (calendarEvents[i][1].slice(0, 10) < date) {
            return (
                <tbody key={event}>
                    <tr >
                        <td>{calendarEvents[i][0]}</td>
                        <td>{calendarEvents[i][1].slice(0, 19).replace('T', ' ')}</td>
                        <td><Link to="/">Details</Link></td>
                    </tr>
                </tbody>
            )
        }
    });
}


class BookingTable extends Component {
    //Functions Called On Load of the component
    componentDidMount() {
        // Start the tick event every 5s - !Used to continously display data in calendar.
        this.timerID = setInterval(
            () => this.tick(),
            5000
        );
    }

    // Refresh the components state !Required!
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="List">
                <div className="title">
                    <a href="/" id="backIcon">
                        <h4><FontAwesomeIcon icon={faArrowAltCircleLeft} /></h4>
                    </a>
                    <h4>Booking History</h4>
                </div>
                <GoogleLogin show={false}/>
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
                        {BookingsToday()}
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
                        {NextBookings()}
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
                        {PreviousBookings()}
                    </Table>
                    <Button onClick={sendEvent}>Add event</Button>
                </div>
            </div>
        )
    }
}
export default BookingTable;