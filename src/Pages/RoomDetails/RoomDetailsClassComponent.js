import React from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./RoomDetails.css";
import Title from '../../components/title';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import ls from 'local-storage';
import { faParking, faRestroom, faUtensils, faWheelchair, faUserFriends,
         faBuilding, faMapMarkedAlt, faUsers, faPhoneSquareAlt, faClipboardList,
         faCalendarAlt, faClock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from "react-dropdown-select";
import CreateBooking from "../../API/createBooking";
import { Redirect } from "react-router-dom";
var hours = "00";
var minutes = "00";

export class RoomDetails extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }

    componentDidMount () {
        var users = [];
        getUsers().then((result) => {
            users = result;
            this.setState({ 
                users: users.map((user) => {
                    return {'value': user[0], 'label': user[3]+' '+user[4]+' - '+user[5]}
                })
            })
        });
    }
 
    state = {
        startDate: new Date(),
        redirect: false
      };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    showElement(elem, type){
        if(elem){
            return <FontAwesomeIcon size="2x" icon={type} className="fa-fw" />
        }
    }
    
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    getRoomLatitudeLongitude() { 
        var room = ls.get('roomJson').split(',');
        return {lat: parseFloat(room[9]), lng: parseFloat(room[10])};
    }

    getRoomNumber(){
        return ls.get('roomJson').split(',')[0].slice(1);
    }

    getPictureId(){
        return ls.get('picId');
    }

    getRoomDetails(){
        console.log(ls.get('roomJson').split(','));
        return ls.get('roomJson').split(',');
    }

    getAtendees(){
        return parseInt(ls.get('attendees'));
    }
    getDateFromLocalStorage(){
        const _date = ls.get('date');
        return _date;
    }

    getTimeFromLocalStorage(){
        const _time = ls.get('time');
        let _hour = _time.split(':')[0];
        _hour = _hour.length == 1 ? '0'+_hour : + _hour;
        let _minute = _time.split(':')[1];
        _minute = _minute.length == 1 ? '0'+_minute : + _minute;
        const correctFormat = _hour+':'+_minute+':00';
        
        return correctFormat;
    }
        
    setUserValues(user){
        console.log(user);
    }

    buildGuestForms(){
        var guestFields = [];
        console.log(this.state.users);
        
        var guests = this.getAtendees() === 0 ? 1 : this.getAtendees();
        for (let i = 0; i < guests; i++) {
            guestFields.push(
            <Form.Group as={Col}controlId="formGridDate">
                <FontAwesomeIcon icon={faUserFriends} />&nbsp;
                <label>Guest {i+1}</label>  
                <Select options={this.state.users} onChange={(values) => this.setUserValues(values[0])} />
            </Form.Group>
            );
        }
        return guestFields;
    }
    onHoursChange = (event) => { hours = event.target.value };
    onMinutesChange = (event) => { minutes = event.target.value };

    _createBooking(){
        const date = this.getDateFromLocalStorage();
        const time = this.getTimeFromLocalStorage();
        console.log(date +' '+time);
        const hours = parseInt(document.getElementById('hours').value);
        const minutes = parseInt(document.getElementById('minutes').value)/60;
        const duration = hours + minutes;
        console.log(duration);
        
        const booking = {
            BOOKING_ID: null,
            BOOKING_DATE: date,
            BOOKING_TIME: date + ' ' + time,
            DURATION: duration,
            GUESTS: this.getAtendees() == 0 ? 1 : this.getAtendees(),
            USER_ID: 41,
            ROOM_ID: this.getRoomDetails()[0].slice(1),
            REVIEW_ID: null
          };
          console.log(booking)
        CreateBooking(booking).then(response => {
            this.setRedirect();
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/bookingHistory' />
        }
    }

    render() {
      return (
        <div>
        <Title title="Room Details" route="/roomDetails"></Title>
        
        <Container>
        {/* <h3>Building: {this.getRoomDetails()[7]} <br />
            Room #{this.getRoomDetails()[1]} - Floor: {this.getRoomDetails()[2]} </h3> */}
        <Card style={{ width: '100%', marginBottom:'1em' }}>
            <Card.Img variant="top" src={"/roomPics/room"+this.getPictureId()+".jpg"} />
            <Card.Body>
                <Card.Title>
                <h5>{<FontAwesomeIcon icon={faBuilding} />} Building: {this.getRoomDetails()[7]} - 
                Room #{this.getRoomDetails()[1]} - Floor: {this.getRoomDetails()[2]}</h5>
                </Card.Title>
                <div class="row">
                    <div class="col-md-8 col-xs-12">
                        {<FontAwesomeIcon icon={faMapMarkedAlt}/>}<b> Address:</b> {this.getRoomDetails()[8]}<br></br>
                        {<FontAwesomeIcon icon={faUsers}/>}<b> Capacity:</b> {this.getRoomDetails()[3]}<br></br>
                        {<FontAwesomeIcon icon={faClipboardList}/>}<b> Facilities:</b> {this.getRoomDetails()[4]}<br></br>
                        {<FontAwesomeIcon icon={faPhoneSquareAlt}/>}<b> Contact Number: </b>{this.getRoomDetails()[11]}<br></br>
                        --<br></br>
                        {<FontAwesomeIcon icon={faCalendarAlt}/>}<b> Date:</b> {this.getDateFromLocalStorage()}<br></br>
                        {<FontAwesomeIcon icon={faClock}/>}<b> Time:</b> {this.getTimeFromLocalStorage()}<br></br>
                    </div>
                    <div class="col-md-4 col-xs-12 icons">
                        <h2>
                            {this.getRoomDetails()[14]==="1"? <FontAwesomeIcon icon={faParking}/> : 
                                <FontAwesomeIcon className="icon-disabled" icon={faParking}/>}&nbsp;-&nbsp;
                            {this.getRoomDetails()[15]==="1"? <FontAwesomeIcon icon={faUtensils}/> : 
                                <FontAwesomeIcon className="icon-disabled" icon={faUtensils}/>}&nbsp;-&nbsp;
                            {<FontAwesomeIcon icon={faRestroom}/>} &nbsp;-&nbsp;
                            {this.getRoomDetails()[5]==="1"? <FontAwesomeIcon icon={faWheelchair}/> : 
                                <FontAwesomeIcon className="icon-disabled" icon={faWheelchair}/>}
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
                                    <Form.Control id="hours" as="select" onChange={this.onHoursChange}>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                    </Form.Control>
                                </div> -
                                <div class="col">
                                    <b>Minutes</b>
                                    <Form.Control id="minutes" as="select" onChange={this.onMinutesChange}>
                                        <option>00</option>
                                        <option>15</option>
                                        <option>30</option>
                                        <option>45</option>
                                    </Form.Control>
                                </div>
                            </Row>
                            <br></br>
                            <Form id="createBookingForm">
                                {this.buildGuestForms()}
                            </Form>
                        </div>
                        <div class="col-6 height">
                            <Map google={this.props.google}
                                style={{width: '100%', height: '60vh', position: 'relative'}}
                                className={'map'}
                                zoom={17}
                                initialCenter={this.getRoomLatitudeLongitude()}>
                            <Marker
                                title={this.getRoomNumber()}
                                name={this.getRoomNumber()}
                                position={this.getRoomLatitudeLongitude()} />
                            </Map>
                        </div>
                    </Row>
                </Container>
                <Button variant="primary float-right" onClick={() => this._createBooking()}> Book Room</Button>
            </Card.Body>
        </Card>
        {this.renderRedirect()}
        </Container>
        </div>
      )
    }
  }

  async function getUsers(){
    const usersResponse = await fetch("http://209.97.191.60:5000/users");
    const responseData = await usersResponse.json();
    return responseData.rows.rows;
  }

  async function getCatering(id){
    const response = await fetch("http://209.97.191.60:5000/caterings/"+id);
    const responseData = await response.json();
    return responseData.rows.rows;
  }

export default GoogleApiWrapper({
apiKey: ('AIzaSyC1w6F4vC24W9aufbaWqXL4ILyanygTT7Y')
})(RoomDetails)
