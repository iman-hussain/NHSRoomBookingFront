import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./SearchRoom.css";
import Room from '../../components/room.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from "../../components/title";
import { faUserFriends, faCalendarDay, faClock, faMapMarkerAlt, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { GoogleLogin } from '../../components/GoogleLogin';

var rooms = [];
var attendees = 0;
var location = ""
var time = ""
var date;
class SearchRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          toiletCheckBox: false,
          cateringCheckBox: false,
          accessableCheckBox: false,
          parkingCheckBox: false,
        };
        this.createBooking = this.createBooking.bind(this);
        this.getRooms = this.getRooms.bind(this);
    }

    getRooms(){
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Row>
              {rooms.map((room, index) => (
                <div key={room} class="col-md-6">
                  <Room
                    picId={room[5]}
                    roomName={room[0]}
                    isAssessible={room[1]}
                    isToilets={room[2]}
                    isCatering={room[3]}
                    isParking={room[4]}
                    attendees={attendees}
                    date={date}
                    time={time}
                    location={location}
                  ></Room>
                </div>
              ))}
            </Row>
          );
        }
    }
    
    generateRooms(){
      var rooms2 = [
      ["MI101", true, true, true, false, 1], 
      ["MI102", false, false, true, true, 2], 
      ["MI103", true, false, false, true, 3], 
      ["MI201", false, true, true, true, 4], 
      ["MI202", true, true, true, true, 6], 
      ["MI203", false, false, true, false, 7], 
      ["MI301", true, true, true, true, 8], 
      ["MI302", false, false, false, true, 9], 
      ["MI304", false, false, true, false, 2],
      ["MA101", false, true, false, false, 4], 
      ["MA102", true, false, false, false, 6], 
      ["MA103", false, false, false, true, 8], 
      ["MA201", false, true, true, true, 9], 
      ["MA202", true, true, true, true, 1], 
      ["MA203", true, false, true, true, 3], 
      ["MA301", true, true, true, true, 5], 
      ["MA302", true, false, false, true, 7], 
      ["MA304", true, true, false, false, 9],
      ["MC101", false, false, false, false, 1], 
      ["MC102", true, false, false, true, 2], 
      ["MC103", false, true, false, true, 3], 
      ["MC201", true, true, true, false, 4], 
      ["MC202", true, true, true, true, 5], 
      ["MC203", false, false, true, true, 6], 
      ["MC301", false, true, true, true, 7], 
      ["MC302", true, false, false, true, 8], 
      ["MC304", true, true, false, false, 9]
    ]
      this.setState({rooms: rooms2, isLoaded: true})
      rooms = rooms2;
      console.log("First Rooms" + rooms);
    }

    componentDidMount() {
/*         fetch("http://209.97.191.60:3001/rooms")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.rows
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        ) */
        this.generateRooms();
    }

    state = {
        startDate: new Date(),
        toiletCheckBox: false,
        cateringCheckBox: false,
        accessableCheckBox: false,
        parkingCheckBox: false,
    };
    
    handleChange = dates => {
      console.log("dates: " + dates);
      console.log("dates: " + dates.getMonth());
      date = dates.getDate() + "-" + dates.getMonth() + "-" + dates.getFullYear();
      time = dates.getHours() + ":" + dates.getMinutes();
      console.log(date);
        this.setState({
            startDate: dates
        });
    };

    onValueChange = value => {
      console.log(value);
      attendees = value;
    }

    handleCheckChange1 = () => {
        this.setState({ toiletCheckBox : !this.state.toiletCheckBox});
    }

    handleCheckChange2 = () => {
      this.setState({ cateringCheckBox : !this.state.cateringCheckBox});
    }
    
    handleCheckChange3 = () => {
      this.setState({ accessableCheckBox : !this.state.accessableCheckBox});
    }

    handleCheckChange4 = () => {
      this.setState({ parkingCheckBox : !this.state.parkingCheckBox});
    }
  
    createBooking(){
      var roomQuery = [];

      this.generateRooms();
      rooms.map(room => {
        if(room[1] === this.state.accessableCheckBox
          && room[2] === this.state.toiletCheckBox
          && room[3] === this.state.cateringCheckBox
          && room[4] === this.state.parkingCheckBox){
            roomQuery.push(room)
          }
      })

      rooms = roomQuery;
      console.log(rooms);
      this.getRooms();
    }

    render() {
      return (
        <div>
        <GoogleLogin/>
        <Title title="Search Room"></Title>
        <Container>
            <Form id="createBookingForm">
                <Form.Group>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formGridDate">
                        <FontAwesomeIcon icon={faUserFriends} />&nbsp;
                        <label>Guests</label>
                        <Form.Control type="number" placeholder="Guests"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                        <FontAwesomeIcon icon={faCalendarDay} />&nbsp;
                        <label>Date</label>
                        <DatePicker
                            className="datePickerStyle"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTime">
                        <FontAwesomeIcon icon={faClock} />&nbsp;
                        <label>Time</label>
                        <DatePicker
                            className="datePickerStyle"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formGridDate">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;
                        <label>Location</label>
                        <Form.Control as="select">
                            <option>Any</option>
                            <option>Birmingham</option>
                            <option>London</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                    <FontAwesomeIcon icon={faHandshake} />&nbsp;
                        <label>Type</label>
                        <Form.Control as="select">
                            <option>Conference</option>
                            <option>Informal</option>
                            <option>Status Update Meetings</option>
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>
                <Row>
                    <Col sm={10}>
                        <Row>
                        <Col>
                            <Form.Check type="switch" id="toilet-switch" label="Toilets"  checked={this.state.toiletCheckBox} onChange={this.handleCheckChange1}/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="catering-switch" label="Catering" checked={this.state.cateringCheckBox} onChange={this.handleCheckChange2}/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="accessable-switch" label="Accessable" checked={this.state.accessableCheckBox} onChange={this.handleCheckChange3}/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="parking-switch" label="Parking" checked={this.state.parkingCheckBox} onChange={this.handleCheckChange4}/>
                        </Col>
                        </Row>
                    </Col>
                    <Col className="pt-1" sm={2}>
                        <Button variant="primary"  onClick={this.createBooking}>Search</Button>
                    </Col>
                </Row>
                </Form.Group>
                <hr></hr>
            </Form>
              {this.getRooms()}
        </Container>
        </div>
      )
    }     
  }
  

export default SearchRoom;