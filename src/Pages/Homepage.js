import React from 'react';
import Block from '../components/blocks';
import MyCalendar from './Calendar/Calendar.js';
import {Container, Row} from 'react-bootstrap';

function HomePage() {
    return (
        <div>
            <div class="title">
                <h4>Calendar</h4>
            </div>
            <Container>
                <Row className="justify-content-center">
                    <MyCalendar/>
                </Row>
            </Container>
            <hr></hr>
            <Container className="menu">
                <h5>Room Booking Services</h5>
                <Block title="Book a Room"></Block>
                <Block title="View Meeting"></Block>
                <Block title="Another Link"></Block>
            </Container>
        </div>
    );
}

export default HomePage;
