/*
  Developed by Liam Penn - 1415065
*/
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import "./Calendar.css";
import MeetingList from '../MeetingList/MeetingList.js';

const CalendarList = () => {
    return(
      <div className="List">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Event Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <MeetingList/>
        </Table>
      </div>
    );
}

export default CalendarList;