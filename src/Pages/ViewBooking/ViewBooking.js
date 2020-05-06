/*Created by Liam Penn 1415065*/
/* This component displays information about a selected booking */
/* Booking Date / Time / Duration / Creator / Guests(currently a number) / 
Room Information Icons, Picture*/
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {Container, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faRestroom, faUtensils, faWheelchair} from '@fortawesome/free-solid-svg-icons'
import GetBuilding from '../../API/getBuilding';
import GetBookingInfo from '../../API/getBookingInfo';
const ViewBooking = () => {
    const bookings = useSelector(state => state.userInfo.bookings);
    const buildingName = GetBuilding(bookings[0][0]);
    const [bookingInfo, setBookingInfo] = useState(["",0,0,0,0,0,0,0,0]);

    useEffect(async () => {
        setBookingInfo(await GetBookingInfo(bookings[0][0]))
    }, [])

    console.log(bookingInfo)

    /*
    "USER_ID"
    "USER_TYPE"
    "PASSWORD"
    "USERNAME"
    "FIRST_NAME"
    "SURNAME"
    "EMAIL"
    "ADDRESS"
    "PHONE_NUMBER"
    "EXPENSE_CODE"
    */

    /*
    "BOOKING_ID"
    "BOOKING_DATE"
    "BOOKING_TIME"
    "DURATION"
    "GUESTS"
    "COLOUR"
    "USER_ID"
    "ROOM_ID"
    "REVIEW_ID"
    */

    /* Get Room by Room_ID */
    /* Get Building Name */
    const date = new Date(bookings[0][1]);
    const bookingDate = date.toDateString();
    return(
        <Container>
        <Card style={{ width: '100%', marginBottom:'1em' }}>
            <Card.Img variant="top" src={"/roomPics/room"+1+".jpg"} style={{width: '50%', padding: '20px'}}>  
            </Card.Img>
            <Card.Body>
                <Card.Title>
                   Building: {bookingInfo[0][0]} <br />
                   Room #{bookings[0][7]} - Floor: {bookingInfo[0][3]} <br />
                   Date: {bookingDate} <br />
                   Duration: {bookings[0][3]} <br />
                   Guests: {bookings[0][4]}
                </Card.Title>
                <div className="iconContainer">
                    {bookingInfo[0][5] === 1 && ShowIcon(faParking)}
                    {bookingInfo[0][8] != null && ShowIcon(faRestroom)}
                    {bookingInfo[0][6] === 1 && ShowIcon(faUtensils)}
                    {bookingInfo[0][7] === 1 && ShowIcon(faWheelchair)}
                </div>
            </Card.Body>
        </Card>
        </Container>
    );
}

const ShowIcon = (icon) => {
    return <FontAwesomeIcon icon={icon} className="fa-fw" />
}
export default ViewBooking;