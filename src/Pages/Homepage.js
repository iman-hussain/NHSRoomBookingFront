import React from 'react';
// import Block from '../components/blocks';
import Title from '../components/title';
import MyCalendar from './Calendar/Calendar';
import {Container, Row, Button} from 'react-bootstrap';
/*
TODO: Show Calander - RoomBooking - Meeting
*/

function HomePage() {
    return (
        <div>
            <Title title="Homepage"></Title>
            <Container>
                <Row className="justify-content-center">
                    <MyCalendar/>
                </Row>
            </Container>
            <hr></hr>
            <Container className="menu">
                <Button href="/searchRoom" variant="primary" size="lg">
                    Search Room
                </Button>
                <br></br><br></br>
                <Button href="/bookingHistory" variant="primary" size="lg">
                    Booking History
                </Button>
                {/* <h5>Room Booking Services</h5>
                <Block title="Book a Room"></Block>
                <Block title="View Meeting"></Block>
                <Block title="Another Link"></Block> */}
            </Container>
            <br></br>
        </div>
    );
}

export default HomePage;
