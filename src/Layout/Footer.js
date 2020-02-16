import Navbar from "react-bootstrap/Navbar";
import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <Navbar variant="dark justify-content-between">
            <ul>
              <li>
                <a href="#pablo">Home</a>
              </li>
              <li>
                <a href="#pablo">Company</a>
              </li>
              <li>
                <a href="#pablo">Portfolio</a>
              </li>
              <li>
                <a href="#pablo">Blog</a>
              </li>
            </ul>
        </Navbar>
      )
    }
  }

export default Footer;