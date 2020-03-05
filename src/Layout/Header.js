import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Form, Container, Button} from "react-bootstrap";
import logo from "../assets/img/nhsRoomBookingLogo.png";

class Header extends React.Component {
    render() {
      return (
        <Navbar variant="blue justify-content-between">
        <Container id="header-container">
            <Navbar.Brand href="#home">
            <a href="/">
              <img
                  alt=""
                  src={logo}
                  width="130"
                  height="50"
                  className="d-inline-block align-top"
              />{' '}
            </a>
            </Navbar.Brand>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button href="/login" variant="outline-light">
                  Log In
                </Button>
            </Form>
        </Container>
      </Navbar>
      )
    }
  }

  export default Header;
