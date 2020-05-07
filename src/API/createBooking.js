const CreateBooking = async (booking) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            BOOKING_ID: null,
            BOOKING_DATE: booking.BOOKING_DATE,
            BOOKING_TIME: booking.BOOKING_TIME,
            DURATION: booking.DURATION,
            GUESTS: booking.GUESTS,
            COLOUR: booking.COLOUR,
            USER_ID: booking.USER_ID,
            ROOM_ID: booking.ROOM_ID,
            REVIEW_ID: null
        })
    };
    const response = await fetch(
        "http://localhost:5000/bookings", requestOptions
      );
      const responseData = await response.json();
      console.log(responseData)
      return responseData;
}

export default CreateBooking
