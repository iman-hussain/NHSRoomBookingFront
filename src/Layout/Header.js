import React from 'react';
<<<<<<< HEAD

function Header() {
    return(
        <div>
            Header
        </div>
    );
}

export default Header;
=======
import Navbar from "react-bootstrap/Navbar";
import {Form, Container, Button} from "react-bootstrap";
import { Link  } from "react-router-dom";
import logo from "../assets/img/nhsRoomBookingLogo.png";

class Header extends React.Component {
    render() {
      return (
        <Navbar variant="dark justify-content-between">
        <Container id="header-container">
            <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="130"
                height="50"
                className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button variant="outline-light">
                  <Link to="/login" >Log In</Link>
                </Button>
            </Form>
        </Container>
      </Navbar>
      )
    }
  }

  export default Header;
>>>>>>> origin/simpleCalendar
