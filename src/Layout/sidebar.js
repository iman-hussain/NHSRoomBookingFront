import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css'

export default class SideBar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">Home</a><hr></hr>
        <a id="about" className="menu-item" href="/searchRoom">Search Room</a><hr></hr>
        <a id="contact" className="menu-item" href="/BookingHistory">Booking History</a><hr></hr>
        <a id="contact" className="menu-item" href="/login">Log In</a><hr></hr>
      </Menu>
    );
  }
}