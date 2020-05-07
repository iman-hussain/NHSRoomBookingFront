import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./RoomDetails.css";
import Title from "../../components/title";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import ls from "local-storage";
import {
  faParking,
  faRestroom,
  faUtensils,
  faWheelchair,
  faUserFriends,
  faBuilding,
  faMapMarkedAlt,
  faUsers,
  faPhoneSquareAlt,
  faClipboardList,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-dropdown-select";
import CreateBooking from "../../API/createBooking";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // userSelector grabs state - in place of mapStateToProps
import { addToBookings} from '../../Redux/userInfo';
import GetBookings from '../../API/getBookings';
var hours = "00";
var minutes = "00";

export const RoomDetails = ({google}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo.userID);
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [redirect, settingRedirect] = useState(false);
  useEffect(() => {
    getUsers(setUsers, users);
  }, []);

  const setRedirect = () => {
    settingRedirect(true);
  };

  const showElement = (elem, type) => {
    if (elem) {
      return <FontAwesomeIcon size="2x" icon={type} className="fa-fw" />;
    }
  };

  const handleChange = (date) => {
    setStartDate(date);
  };

  const getRoomLatitudeLongitude = () => {
    var room = ls.get("roomJson").split(",");
    return { lat: parseFloat(room[9]), lng: parseFloat(room[10]) };
  };

  const getRoomNumber = () => {
    return ls.get("roomJson").split(",")[0].slice(1);
  };

  const getPictureId = () => {
    return ls.get("picId");
  };

  const getRoomDetails = () => {
    console.log(ls.get("roomJson").split(","));
    return ls.get("roomJson").split(",");
  };

  const getAtendees = () => {
    return parseInt(ls.get("attendees"));
  };
  const getDateFromLocalStorage = () => {
    const _date = ls.get("date");
    return _date;
  };

  const getTimeFromLocalStorage = () => {
    const _time = ls.get("time");
    let _hour = _time.split(":")[0];
    _hour = _hour.length == 1 ? "0" + _hour : +_hour;
    let _minute = _time.split(":")[1];
    _minute = _minute.length == 1 ? "0" + _minute : +_minute;
    const correctFormat = _hour + ":" + _minute + ":00";

    return correctFormat;
  };

  const setUserValues = (user) => {
    console.log(user);
  };

  const buildGuestForms = () => {
    var guestFields = [];
    console.log(users);

    var guests = getAtendees() === 0 ? 1 : getAtendees();
    for (let i = 0; i < guests; i++) {
      guestFields.push(
        <Form.Group as={Col} controlId="formGridDate">
          <FontAwesomeIcon icon={faUserFriends} />
          &nbsp;
          <label>Guest {i + 1}</label>
          <Select
            options={users}
            onChange={(values) => setUserValues(values[0])}
          />
        </Form.Group>
      );
    }
    return guestFields;
  };
  const onHoursChange = (event) => {
    hours = event.target.value;
  };
  const onMinutesChange = (event) => {
    minutes = event.target.value;
  };

  const _createBooking = (user) => {
    const date = getDateFromLocalStorage();
    const time = getTimeFromLocalStorage();
    console.log(date + " " + time);
    const hours = parseInt(document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value) / 60;
    const duration = hours + minutes;
    console.log(duration);

    var colours = [
        'RED',
        'YELLOW',
        'BLUE',
        'GREEN',
        'ORANGE',
        'PURPLE'
    ]

    const booking = {
      BOOKING_ID: null,
      BOOKING_DATE: date,
      BOOKING_TIME: date + " " + time,
      DURATION: duration,
      GUESTS: getAtendees() == 0 ? 1 : getAtendees(),
      COLOUR: colours[Math.floor(Math.random()*colours.length)],
      USER_ID: user,
      ROOM_ID: getRoomDetails()[0].slice(1),
      REVIEW_ID: null,
    };
    console.log(booking);
    CreateBooking(booking).then((response) => {
      console.log(response)
      dispatch(addToBookings({booking: [
          booking.BOOKING_ID,
          booking.BOOKING_DATE,
          booking.BOOKING_TIME,
          booking.DURATION,
          booking.GUESTS,
          booking.COLOUR,
          booking.USER_ID,
          booking.ROOM_ID,
          booking.REVIEW_ID
      ]}))
      setRedirect();
    });
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/bookingHistory" />;
    }
  };

  return (
    <div>
      <Title title="Room Details" route="/roomDetails"></Title>

      <Container>
        {/* <h3>Building: {this.getRoomDetails()[7]} <br />
            Room #{this.getRoomDetails()[1]} - Floor: {this.getRoomDetails()[2]} </h3> */}
        <Card style={{ width: "100%", marginBottom: "1em" }}>
          <Card.Img
            variant="top"
            src={"/roomPics/room" + getPictureId() + ".jpg"}
          />
          <Card.Body>
            <Card.Title>
              <h5>
                {<FontAwesomeIcon icon={faBuilding} />} Building:{" "}
                {getRoomDetails()[7]} - Room #{getRoomDetails()[1]} -
                Floor: {getRoomDetails()[2]}
              </h5>
            </Card.Title>
            <div class="row">
              <div class="col-md-8 col-xs-12">
                {<FontAwesomeIcon icon={faMapMarkedAlt} />}
                <b> Address:</b> {getRoomDetails()[8]}
                <br></br>
                {<FontAwesomeIcon icon={faUsers} />}
                <b> Capacity:</b> {getRoomDetails()[3]}
                <br></br>
                {<FontAwesomeIcon icon={faClipboardList} />}
                <b> Facilities:</b> {getRoomDetails()[4]}
                <br></br>
                {<FontAwesomeIcon icon={faPhoneSquareAlt} />}
                <b> Contact Number: </b>
                {getRoomDetails()[11]}
                <br></br>
                --<br></br>
                {<FontAwesomeIcon icon={faCalendarAlt} />}
                <b> Date:</b> {getDateFromLocalStorage()}
                <br></br>
                {<FontAwesomeIcon icon={faClock} />}
                <b> Time:</b> {getTimeFromLocalStorage()}
                <br></br>
              </div>
              <div class="col-md-4 col-xs-12 icons">
                <h2>
                  {getRoomDetails()[14] === "1" ? (
                    <FontAwesomeIcon icon={faParking} />
                  ) : (
                    <FontAwesomeIcon
                      className="icon-disabled"
                      icon={faParking}
                    />
                  )}
                  &nbsp;-&nbsp;
                  {getRoomDetails()[15] === "1" ? (
                    <FontAwesomeIcon icon={faUtensils} />
                  ) : (
                    <FontAwesomeIcon
                      className="icon-disabled"
                      icon={faUtensils}
                    />
                  )}
                  &nbsp;-&nbsp;
                  {<FontAwesomeIcon icon={faRestroom} />} &nbsp;-&nbsp;
                  {getRoomDetails()[5] === "1" ? (
                    <FontAwesomeIcon icon={faWheelchair} />
                  ) : (
                    <FontAwesomeIcon
                      className="icon-disabled"
                      icon={faWheelchair}
                    />
                  )}
                </h2>
              </div>
            </div>

            <hr></hr>
            <Container>
              <Row>
                <div class="col-6">
                  <h5>Select the booking duration:</h5>
                  <Row>
                    <div class="col">
                      <b>Hours</b>
                      <Form.Control
                        id="hours"
                        as="select"
                        onChange={onHoursChange}
                      >
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                      </Form.Control>
                    </div>{" "}
                    -
                    <div class="col">
                      <b>Minutes</b>
                      <Form.Control
                        id="minutes"
                        as="select"
                        onChange={onMinutesChange}
                      >
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                      </Form.Control>
                    </div>
                  </Row>
                  <br></br>
                  <Form id="createBookingForm">{buildGuestForms()}</Form>
                </div>
                <div class="col-6 height">
                  <Map
                    google={google}
                    style={{
                      width: "100%",
                      height: "60vh",
                      position: "relative",
                    }}
                    className={"map"}
                    zoom={17}
                    initialCenter={getRoomLatitudeLongitude()}
                  >
                    <Marker
                      title={getRoomNumber()}
                      name={getRoomNumber()}
                      position={getRoomLatitudeLongitude()}
                    />
                  </Map>
                </div>
              </Row>
            </Container>
            <Button
              variant="primary float-right"
              onClick={() => _createBooking(user)}
            >
              {" "}
              Book Room
            </Button>
          </Card.Body>
        </Card>
        {renderRedirect()}
      </Container>
    </div>
  );
};

async function getUsers(setUsers, users) {
  const usersResponse = await fetch("http://209.97.191.60:5000/users");
  const responseData = await usersResponse.json();
  setUsers(
    users.map((user) => {
      return {
        value: user[0],
        label: user[3] + " " + user[4] + " - " + user[5],
      };
    })
  );
  return responseData.rows.rows;
}

async function getCatering(id) {
  const response = await fetch("http://209.97.191.60:5000/caterings/" + id);
  const responseData = await response.json();
  return responseData.rows.rows;
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC1w6F4vC24W9aufbaWqXL4ILyanygTT7Y",
})(RoomDetails);
