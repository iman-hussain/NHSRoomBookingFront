import React, { Component } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faRestroom, faUtensils, faWheelchair} from '@fortawesome/free-solid-svg-icons'
import "./room.css";
import {SendEvent, GoogleLogin, CreateEvent} from './GoogleLogin.js';

var event;
export default class Room extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
          eventClick: true,
        }
        this.createEvent = this.createEvent.bind(this);
        
    }

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

    componentDidUpdate(){
        /* console.log(this.props.roomName);
        console.log(this.props.attendees);
        console.log(this.props.date);
        console.log(this.props.time);
        console.log(this.props.accessibility);
        console.log(this.props.toilet);
        console.log(this.props.catering);
        console.log(this.props.parking);
        console.log(this.props.location); */
      }
    showElement(elem, type){
        if(elem==1){
            return <FontAwesomeIcon icon={type} className="fa-fw" />
        }
    }

    createEvent(){
       return event = {
            'summary': this.props.roomNumber + "@" + this.props.date + " " + this.props.time,
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': this.props.capacity,
            'start': {
              'dateTime': this.props.date + 'T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': this.props.date + 'T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': [
              {'email': 'liamcsdev@gmail.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          };
          //{this.state.eventClick? <SendEvent event={event}/>: ""}
    }
    
    render() {
        return (
            <Container>
            <GoogleLogin/>
            <Card style={{ width: '100%', marginBottom:'1em' }}>
                <Card.Img variant="top" src={"/roomPics/room"+this.props.picId+".jpg"} />
                <Card.Body>
                    <Card.Title>
                       Building: {this.props.building[1]} <br />
                       Room #{this.props.roomNumber} - Floor: {this.props.floor}
                    </Card.Title>
                    <div className="iconContainer">
                        {this.showElement(this.props.parking, faParking)}
                        {this.showElement(this.props.toilet, faRestroom)}
                        {this.showElement(this.props.catering, faUtensils)}
                        {this.showElement(this.props.accessibility, faWheelchair)}
                    </div>
                    <Button variant="primary">Book Room</Button>
                </Card.Body>
            </Card>
            </Container>
            
        )
    }
}