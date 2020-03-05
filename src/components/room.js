import React, { Component } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faRestroom, faUtensils, faWheelchair} from '@fortawesome/free-solid-svg-icons'
import "./room.css";

export default class Room extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.createEvent = this.createEvent.bind(this);
    }

    componentDidUpdate(){
        console.log(this.props.roomName);
        console.log(this.props.isAssessible);
        console.log(this.props.isToilets);
        console.log(this.props.isCatering);
        console.log(this.props.isParking);
        console.log(this.props.attendees);
        console.log(this.props.date);
        console.log(this.props.time);
        console.log(this.props.location);
    }
    showElement(elem, type){
        if(elem){
            return <FontAwesomeIcon size="2x" icon={type} className="fa-fw" />
        }
    }

    createEvent(){
        var event = {
            'summary': this.props.isAssessible,
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
              'dateTime': '2020-03-7T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2020-03-07T17:00:00-07:00',
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

    }
    
    render() {
        return (
            <a href="/roomBooking">
            <Container>
            <Card style={{ width: '100%', marginBottom:'1em' }}>
                <Card.Img variant="top" src={"/roomPics/room"+this.props.picId+".jpg"} />
                <Card.Body>
                    <Card.Title>{this.props.roomName}</Card.Title>
                    <div className="iconContainer">
                        {this.showElement(this.props.isParking, faParking)}
                        {this.showElement(this.props.isToilets, faRestroom)}
                        {this.showElement(this.props.isCatering, faUtensils)}
                        {this.showElement(this.props.isAssessible, faWheelchair)}
                    </div>
                    <Button variant="primary" onClick={this.createEvent()}>Book Room</Button>
                </Card.Body>
            </Card>
            </Container>
            </a>
        )
    }
}