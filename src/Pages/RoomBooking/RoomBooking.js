import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./RoomBooking.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

class RoomBooking extends React.Component {
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
            <h4>Create Booking</h4>
        </div>
        <Container>
            <Form id="createBookingForm">
                <h2>Facilities available</h2>
                <hr></hr>
                <h5>
                <Row>
                    <Col>
                        <Form.Check type="switch" id="toilet-switch" label="Toilets"/>
                    </Col>
                    <Col>
                        <Form.Check type="switch" id="catering-switch" label="Catering"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="switch" id="accessable-switch" label="Accessable"/>
                    </Col>
                    <Col>
                        <Form.Check type="switch" id="parking-switch" label="Parking"/>
                    </Col>
                </Row>
                </h5>
                {/* <h2>Create Booking</h2> */}
                <hr></hr>
                <Form.Group as={Col} controlId="formGridBuilding">
                    <h5>Building</h5>
                    <Form.Control as="select">
                    <option>Alan Turing Building</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRoom">
                    <h5>Room</h5>
                    <Form.Control as="select">
                    <option>Main Room</option>
                    <option>1A</option>
                    <option>1B</option>
                    <option>1C</option>
                    <option>2A</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDate">
                        <h5>Date</h5>
                        <DatePicker
                            className="datePickerStyle"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridTime">
                        <h5>Time</h5>
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
                </Form.Group>
                <div className="centered">
                <Button variant="primary" size="lg">
                    Create Booking
                </Button>
                </div>
            </Form>
        </Container>
        </div>
      )
    }
  }

export default RoomBooking;