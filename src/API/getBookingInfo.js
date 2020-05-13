const GetBookingInfo = async (id) => {
    const response = await fetch(
        "http://209.97.191.60:5000/bookings/info/"+id
      );
      const responseData = await response.json();
      console.log(responseData)
      return responseData.rows.rows;
}

export default GetBookingInfo
