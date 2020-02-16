import React from 'react';
import './App.css';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import Block from './components/blocks.js';
import MyCalendar from './Pages/Calendar/Calendar.js';
import {Container, Row} from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="line"></div>
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

      <Footer/>
    </div>
  );
}

export default App;
