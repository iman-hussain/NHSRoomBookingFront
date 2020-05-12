/*Created by Liam Penn 1415065*/
/* This component displays information about a selected booking */
/* Booking Date / Time / Duration / Creator / Guests(currently a number) / 
Room Information Icons, Picture*/
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {Container, Card, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faRestroom, faUtensils, faWheelchair} from '@fortawesome/free-solid-svg-icons'
import GetBuilding from '../../API/getBuilding';
import GetBookingInfo from '../../API/getBookingInfo';
import {useParams} from "react-router-dom";
import Title from "../../components/title";
const ViewBooking = () => {
    const {id} = useParams()
    console.log(id)
    const bookings = useSelector(state => state.userInfo.bookings);
    const buildingName = GetBuilding(bookings[0][0]);
    const [bookingInfo, setBookingInfo] = useState(["",0,0,0,0,0,0,0,0]);
    const [dateInfo, setDateInfo] = useState(null);
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const fetchData = async() => {
            const result = await GetBookingInfo(id);
            setBookingInfo(result)
          }
          fetchData();
    }, [])

    useEffect(() => {
        const result = bookings.filter(item => {
            return item[0] == id;
        })
        
        setDateInfo(result);
    }, [])

    useEffect(() => {
        if(dateInfo){
           setDate(new Date(dateInfo[0][1])) 
        }
  
    }, [dateInfo])
    console.log(date)
    const bookingDate = date.toDateString();
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
 
    return(
        <>
        <Title title="Booking Details"></Title>
        <Container>
        <Row>
        <Col sm={true}>
            <Card.Img variant="top" src={"/roomPics/room"+1+".jpg"} style={{width: '100%', alignSelf: 'center'}}>  
            </Card.Img>
        </Col>
        <Col md="auto">
 
            <Card.Body style={{alignSelf: 'center', padding: '15px 25px 0px 0px'}}>
                <Card.Title >
                   Building: {bookingInfo[0][0]} <br />
                   Floor: {bookingInfo[0][3]} - Room #{bookings[0][7]}  <br />
                   Date: {bookingDate} <br />
                   Duration: {bookings[0][3]} hrs <br />
                   Guests: {bookings[0][4]} <br/>
                   Meeting Host: {bookingInfo[0][10]}
                </Card.Title>
                <div className="iconContainer">
                    {bookingInfo[0][5] === 1 && ShowIcon(faParking)}
                    {bookingInfo[0][8] != null && ShowIcon(faRestroom)}
                    {bookingInfo[0][6] === 1 && ShowIcon(faUtensils)}
                    {bookingInfo[0][7] === 1 && ShowIcon(faWheelchair)}
                </div>
            </Card.Body>
            
        </Col>
        </Row>
        </Container>
        </>
    );
}

const ShowIcon = (icon) => {
    return <FontAwesomeIcon icon={icon} className="fa-fw" />
}
export default ViewBooking;