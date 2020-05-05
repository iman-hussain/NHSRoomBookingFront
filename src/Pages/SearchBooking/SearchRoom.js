import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./SearchRoom.css";
import Room from '../../components/room.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from "../../components/title";
import { faUserFriends, faCalendarDay, faClock, faMapMarkerAlt, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { GoogleLogin } from '../../components/GoogleLogin';
import ls from 'local-storage';

var globalRooms = [];
var attendees = 0;
var location = {};
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
          rooms: []
        };
        this.filterRooms = this.filterRooms.bind(this);
        this.buildRooms = this.buildRooms.bind(this);
    }

    handleRoomClick(room){
      ls.set('roomJson', JSON.stringify(room));
      ls.set('attendees', this.attendees? this.attendees.toString():'0');
    }
    
    componentDidMount() {
      getRoomsFromDB().then(async (result) => {
        let tempRooms = [];
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          const buildingResult = await (getBuildingFromDB(element[6].toString()));
          element[6] = buildingResult;
          tempRooms.push(element);
        }
        this.setState({rooms:tempRooms, isLoaded: true});
        globalRooms = tempRooms;
      });
    }

    filterRooms(){
      let tempRooms = [];

      globalRooms.map(room => {
        console.log(room);
        if(room[5] == this.state.accessableCheckBox &&
          room[6][0][8] == this.state.parkingCheckBox &&
          room[6][0][9] == this.state.cateringCheckBox &&
          room[7] == this.state.toiletCheckBox){
            tempRooms.push(room)
        }
      })
      
      this.setState({rooms: tempRooms})
      //this.buildRooms();
    }

    buildRooms(){
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          let componentArrays = [];
          let rooms = [];
          // if(globalRooms == null){
          //   rooms = this.state.rooms;
          // }else{
          //   rooms = globalRooms;
          // }
          console.log(this.state.rooms)
          for(let i=0; i < this.state.rooms.length; i++){
            let room = this.state.rooms[i];
            componentArrays.push(
              <div key={room} class="col-md-6">
                <a href="/roomDetails" onClick={() => this.handleRoomClick(room)}>
                <Room 
                  picId={i+1}
                  roomNumber={room[1]}
                  floor={room[2]}
                  capacity={room[3]}
                  facilities={room[4]}
                  accessibility={room[5]}
                  building={room[6][0]}
                  parking={room[6][0][8]}
                  catering={room[6][0][9]}
                  toilet={1}
                  date={date}
                  time={time}
                ></Room>
                </a>
              </div>
            )
          }
          return (
            <Row>
              {componentArrays}
            </Row>
          );
        }
    }

    state = {
        startDate: new Date(),
        toiletCheckBox: false,
        cateringCheckBox: false,
        accessableCheckBox: false,
        parkingCheckBox: false,
    };
    
    handleChange = dates => {
      date = dates.getDate() + "-" + dates.getMonth() + "-" + dates.getFullYear();
      time = dates.getHours() + ":" + dates.getMinutes() + ":00";
      ls.set('date', date? date.toString():'0');
      ls.set('time', time? time.toString():'0');
      console.log(date, "time:", dates);
        this.setState({
            startDate: dates
        });
    };

    onGuestsChange = (event) => { this.attendees = event.target.value };

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
                        <Form.Control type="number" placeholder="Guests" 
                            onChange={this.onGuestsChange}
                        />
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
                            <Form.Check type="switch" id="accessable-switch" label="Accessible" checked={this.state.accessableCheckBox} onChange={this.handleCheckChange3}/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="parking-switch" label="Parking" checked={this.state.parkingCheckBox} onChange={this.handleCheckChange4}/>
                        </Col>
                        </Row>
                    </Col>
                    <Col className="pt-1" sm={2}>
                        <Button variant="primary"  onClick={this.filterRooms}>Search</Button>
                    </Col>
                </Row>
                </Form.Group>
                <hr></hr>
            </Form>
              {this.buildRooms()}
        </Container>
        </div>
      )
    }     
  }

  async function getRoomsFromDB(){
    const response = await fetch("http://209.97.191.60:5000/rooms");
    const responseData = await response.json();
    return responseData.rows.rows;
  }

  async function getBuildingFromDB(buildingId){
    const response = await fetch("http://209.97.191.60:5000/buildings/"+buildingId);
    const responseData = await response.json();
    return responseData.rows.rows;
  }
  

export default SearchRoom;