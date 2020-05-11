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
import moment from 'moment';

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
          rooms: [],
          render: false
        };
        this.filterRooms = this.filterRooms.bind(this);
        this.buildRooms = this.buildRooms.bind(this);
        this.Guests = React.createRef();
        this.Location = React.createRef();
    }

    handleRoomClick(picId, room){
      ls.set('roomJson', JSON.stringify(room));
      ls.set('picId', picId.toString());
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
      return true;
    }

    buildRooms(){
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          let componentArrays = [];

          // Filter by checkbox
          let filteredRooms = this.state.rooms.filter(room => {
            let count = 0;
            let requiredCount = 0;
            requiredCount += this.state.accessableCheckBox?1:0;
            requiredCount += this.state.parkingCheckBox?1:0;
            requiredCount += this.state.cateringCheckBox?1:0;

            if(this.state.parkingCheckBox && room[6][0][8] == this.state.parkingCheckBox){
              count += 1;
            }
            if(this.state.accessableCheckBox && room[5] == this.state.accessableCheckBox){
              count += 1;
            }
            if(this.state.cateringCheckBox && room[6][0][9] == this.state.cateringCheckBox){
              count += 1;
            }

            return count === requiredCount;
          })

          // Filter by Inputs
          filteredRooms = filteredRooms.filter(room => {
            
            // Filter by Room Capacity by Guests amount
            if(room[3] < this.Guests.current.value){
             return false; 
            }
            //Filter by Location
            if(!room[6][0][2].includes(this.Location.current.value) && 
                this.Location.current.value != "Any"){
              return false;
            }

            return true;
          })


          console.log(this.state.rooms)
          console.log("filtered rooms", filteredRooms);
          console.log("element value", this.Guests.current.value);
          console.log("element value", this.Location.current.value);

          if(filteredRooms.length == 0){
            return (
              <h3>No Rooms Availables</h3>
            )
          }

          componentArrays = filteredRooms.map((room, i) => {
            return (<div key={room} class="col-md-6">
            <a href="/roomDetails" onClick={() => this.handleRoomClick(i+1, room)}>
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
          </div>);
          })
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
      date = moment(dates).format('DD-MMM-YYYY');
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
  
    reRender() {
      //console.log("element", this.Guests);
      this.setState({...this.state, ...{render: !this.state.render}});
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
                            onChange={this.onGuestsChange} ref={this.Guests}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                        <FontAwesomeIcon icon={faCalendarDay} />&nbsp;
                        <label>Date</label>
                        <DatePicker
                            id="datePicker"
                            className="datePickerStyle"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat={"dd-MMM-yyyy"}
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
                            dateFormat="hh:mm:aa"
                            />
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formGridDate">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;
                        <label>Location</label>
                        <Form.Control as="select" ref={this.Location}>
                            <option>Any</option>
                            <option>BIRMINGHAM</option>
                            <option>ENFIELD</option>
                            <option>SWANSEA</option>
                            <option>ABERDEEN</option>
                            <option>HEREFORD</option>
                            <option>DUDLEY</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                    <FontAwesomeIcon icon={faHandshake} />&nbsp;
                        <label>Type</label>
                        <Form.Control as="select">
                            <option>Conference</option>
                            <option>Meeting</option>
                            <option>Room</option>
                            <option>Theatre</option>
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
                        <Button variant="primary"  onClick={this.reRender.bind(this)}>Search</Button>
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
    const response = await fetch("http://localhost:5000/rooms");
    const responseData = await response.json();
    return responseData.rows.rows;
  }

  async function getBuildingFromDB(buildingId){
    const response = await fetch("http://localhost:5000/buildings/"+buildingId);
    const responseData = await response.json();
    return responseData.rows.rows;
  }
  

export default SearchRoom;