const GetBookings = async (userDetails) => {
    const bookingResponse = await fetch(
      "http://localhost:5000/bookings/user/"+userDetails
    );
    const responseData = await bookingResponse.json();
    let bookings = responseData.rows.rows;
    return bookings;
  }
export default GetBookings;