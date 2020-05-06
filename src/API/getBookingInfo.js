const GetBookingInfo = async (id) => {
    const response = await fetch(
        "http://localhost:5000/bookings/info/"+id
      );
      const responseData = await response.json();
      console.log(responseData)
      return responseData.rows.rows;
}

export default GetBookingInfo
