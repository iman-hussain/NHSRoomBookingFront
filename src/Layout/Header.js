import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Form, Container, Button } from "react-bootstrap";
import logo from "../assets/img/nhsRoomBookingLogo.png";
import { useSelector, useDispatch } from "react-redux"; // userSelector grabs state
import { userLoggedOut} from "../Redux/userInfo";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.userInfo);
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
            />{" "}
          </a>
        </Navbar.Brand>
        <p style={{position:'absolute', paddingTop: '55px'}}>Version 1.0.2</p>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          {!loggedIn.email ? (
            <div>
              <Button href="/login" variant="outline-light">
                Log In
              </Button>
              <span style={{padding:"5px"}}></span>
              <Button href="/signup" variant="outline-light">
                Sign up
              </Button>
            </div>
          ) : (
            <>
            <Button href="/login" variant="outline-light">
              Profile
            </Button>
            <span style={{padding:"5px"}}></span>            
            <Button href="/login" variant="outline-light"
            onClick={() => dispatch(userLoggedOut())}>
              Log out
            </Button>
            </>
          )}
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
