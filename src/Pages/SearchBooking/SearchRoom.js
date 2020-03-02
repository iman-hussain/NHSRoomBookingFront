import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./SearchRoom.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faUserFriends, faCalendarDay, faClock, faMapMarkerAlt, faHandshake } from '@fortawesome/free-solid-svg-icons'

class SearchRoom extends React.Component {
    state = {
        startDate: new Date()
      };
    
    handleChange = date => {
    this.setState({
        startDate: date
    });
    };

    render() {
      return (
        <div>
        <div className="title">
            <a href="/" id="backIcon">
                <h4><FontAwesomeIcon icon={faArrowAltCircleLeft} /></h4>
            </a>
            <h4>Search Room</h4>
        </div>
        <Container>
            <Form id="createBookingForm">
                <Form.Group>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formGridDate">
                        <FontAwesomeIcon icon={faUserFriends} />&nbsp;
                        <label>Guests</label>
                        <Form.Control type="number" placeholder="Guests" />
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
                            <Form.Check type="switch" id="toilet-switch" label="Toilets"/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="catering-switch" label="Catering"/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="accessable-switch" label="Accessable"/>
                        </Col>
                        <Col>
                            <Form.Check type="switch" id="parking-switch" label="Parking"/>
                        </Col>
                        </Row>
                    </Col>
                    <Col className="pt-1" sm={2}>
                        <Button variant="primary">Search</Button>
                    </Col>
                </Row>
                </Form.Group>
                <hr></hr>
            </Form>
        </Container>
        </div>
      )
    }
  }

export default SearchRoom;