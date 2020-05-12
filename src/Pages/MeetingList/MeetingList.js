/*
  Developed by Liam Penn - 1415065
  Display the meetings in an ordered list. 
*/

import React, {useState, useEffect} from 'react';
import './MettingList.css';
import {GoogleLogin, events} from '../../components/GoogleLogin.js';
import { useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps
import GetBookingInfo from '../../API/getBookingInfo';
let Events = [];

// Sort the bookings by date, closest first.
function sortBookingsByDate(a, b) {
  if(a[1] === b[1]) {
      return 0;
  } else {
      return (a[1] < b[1]) ? -1 : 1;
  }
}

const getInfo = async (bookings) => {
  var res = []
  for (var i = 0; i < bookings.length; i++) {
    await GetBookingInfo(bookings[i][0]).then( result => {
      res.push(result)
    })
  }
  console.log(res)
  return res;
}


const MeetingList = () => {
  let bookings = useSelector(state => state.userInfo.bookings);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [info, setInfo] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  var calendarEvents = [];

  async function fetchData(bookings){
    const response = await getInfo(bookings);
    return response
  }

  useEffect(() => {
    if (bookings[0] && bookings[0].length > 0) {
      fetchData(bookings).then(response => {
        setInfo(response);
        for (var i = 0; i < bookings.length; i++) {
          calendarEvents.push([bookings[i][1], bookings[i][2], bookings[i][5]]);
        }
      })
    }
  }, [])

  useEffect(() => {
    if(!firstLoad){
      var calEvents = []
      if (bookings[0] && bookings[0].length > 0) {
        for (var i = 0; i < bookings.length; i++) {
          console.log(info[i])
          calEvents.push([bookings[i][1], bookings[i][2], bookings[i][5], info[i][0], bookings[i][3]]);
        }
      }
      setBookingInfo(calEvents)
    } 
    setFirstLoad(false);
    
  }, [info])

  if (bookings[0] && bookings[0].length > 0) {
    //console.log(bookings)
    bookings = bookings.slice().sort(sortBookingsByDate);
    
    for (var i = 0; i < bookings.length; i++) {
      calendarEvents.push([bookings[i][1], bookings[i][2], bookings[i][5]]);
    }
  }

  console.log(info)
  Events = calendarEvents;
  console.log(Events)
  console.log(bookingInfo)
  /*  Date || Time || Color || Building || LAT || LONG || FLOOR || CAPACITY || PARKING || CATERING || ACCESS || TOILET_ID || DURATION */
  if(bookingInfo && !!bookingInfo){
  return bookingInfo.map((event, i) => {
    var calendarDate = bookingInfo[i][1].slice(0, 19).replace('T', ' ')
    var nDate = new Date(calendarDate);
    console.log(bookingInfo[i][3])
    nDate.setTime( nDate.getTime() - nDate.getTimezoneOffset() * 60 * 1000 );
    var endMeeting = new Date(calendarDate);
    endMeeting.setTime((endMeeting.getTime() - nDate.getTimezoneOffset() * 60 * 1000) + (60 * 60 * 1000 * bookingInfo[i][3][9]))
    console.log("Duration")
    console.log(bookingInfo[i][3][9])
    console.log(nDate)
    console.log(endMeeting)
    //calendarEvents[i][1].slice(0, 19).replace('T', ' ')
    return (
      <tbody key={event}>
        <tr className="meetingList">
          <td style={{width: "10%"}} className="center"><div className="circle" style={{background: bookingInfo[i][2]}}></div></td>
          <td style={{width: "45%"}} >{bookingInfo[i][3][0] + ' - Floor ' + bookingInfo[i][3][3] + ' - Room ' + bookingInfo[i][4] + '\nHosted By: ' + bookingInfo[i][3][10]}</td>
          <td style={{width: "45%"}} >{nDate.toDateString() + ' ' + nDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' to ' + endMeeting.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
        </tr>        
      </tbody>
    )
  })  } else {
    return <tbody>
    <tr >
    </tr>        
  </tbody>
  }
}

export default MeetingList;

export {Events}