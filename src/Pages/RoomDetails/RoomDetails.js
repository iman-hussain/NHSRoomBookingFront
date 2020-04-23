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
      };

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
        return ls.get('roomJson').split(',')[5];
    }

    getRoomDetails(){
        console.log(ls.get('roomJson').split(','));
        return ls.get('roomJson').split(',');
    }

    getAtendees(){
        return parseInt(ls.get('attendees'));
    }
    getDateFromLocalStorage(){
        return ls.get('date');
    }
    getTimeFromLocalStorage(){
        return ls.get('time');
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
                            {this.getRoomDetails()[14]==="1"? <FontAwesomeIcon icon={faRestroom}/> : 
                            <FontAwesomeIcon className="icon-disabled" icon={faRestroom}/>}&nbsp;-&nbsp;
                            {this.getRoomDetails()[15]==="1"? <FontAwesomeIcon icon={faWheelchair}/> : 
                                <FontAwesomeIcon className="icon-disabled" icon={faWheelchair}/>}
                        </h2>
                    </div>
                    <div class="col-12">
                    </div>
                </div>
                <Button variant="primary float-right">Book Room</Button>
            </Card.Body>
        </Card>

        <Container>
            <Row>
                <div class="col-6">
                    <Form id="createBookingForm">
                        {this.buildGuestForms()}
                    </Form>
                </div>
                <div class="col-6">
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
