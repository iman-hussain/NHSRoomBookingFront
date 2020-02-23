import Navbar from "react-bootstrap/Navbar";
import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <Navbar className="footer" variant="dark justify-content-between">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Log In</a>
              </li>
            </ul>
        </Navbar>
      )
    }
  }

export default Footer;