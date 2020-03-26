import React from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./RoomDetails.css";
import Title from '../../components/title';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import ls from 'local-storage';
import { faParking, faRestroom, faUtensils, faWheelchair, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class RoomDetails extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
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
        return {lat: parseFloat(room[6]), lng: parseFloat(room[7])};
    }

    getRoomName(){
        return ls.get('roomJson').split(',')[0].slice(1);
    }

    getPictureId(){
        return ls.get('roomJson').split(',')[5];
    }

    getAtendees(){
        return parseInt(ls.get('attendees'));
    }

    buildGuestForms(){
        var guestFields = [];
        // Use function "this.getAtendees()" later.
        for (let i = 0; i < 4; i++) {
            guestFields.push(
            <Form.Group as={Col}controlId="formGridDate">
                <FontAwesomeIcon icon={faUserFriends} />&nbsp;
                <label>Guest {i+1}</label>
                <Form.Control type="number" placeholder="Guests"/>
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
        <h3>Room: {this.getRoomName()} </h3>
        <Card style={{ width: '100%', marginBottom:'1em' }}>
            <Card.Img variant="top" src={"/roomPics/room"+this.getPictureId()+".jpg"} />
            <Card.Body>
                <Card.Title>{this.props.roomName}</Card.Title>
                <div className="iconContainer">
                    {this.showElement(this.props.isParking, faParking)}
                    {this.showElement(this.props.isToilets, faRestroom)}
                    {this.showElement(this.props.isCatering, faUtensils)}
                    {this.showElement(this.props.isAssessible, faWheelchair)}
                </div>
                <Button variant="primary">Book Room</Button>
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
                        style={{width: '100%', height: '100vh', position: 'relative'}}
                        className={'map'}
                        zoom={17}
                        initialCenter={this.getRoomLatitudeLongitude()}>
                    <Marker
                        title={this.getRoomName()}
                        name={this.getRoomName()}
                        position={this.getRoomLatitudeLongitude()} />
                    </Map>
                </div>
            </Row>
        </Container>
            {/* <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC1w6F4vC24W9aufbaWqXL4ILyanygTT7Y' }}
                defaultCenter={this.getRoomLatitudeLongitude()}
                defaultZoom={15}
                >
                <Marker position={this.getRoomLatitudeLongitude()} />

                </GoogleMapReact>
            </div> */}
        </Container>
        </div>
      )
    }
  }


export default GoogleApiWrapper({
apiKey: ('AIzaSyC1w6F4vC24W9aufbaWqXL4ILyanygTT7Y')
})(RoomDetails)
