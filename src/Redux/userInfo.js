import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        username: "",
        userType: "",
        userID: "",
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        expenseCode: "",
    },
    reducers: {
        userLoggedIn: (state, action) => {
            const {username, userType, userID, name, email, address, phoneNumber, expenseCode, loggedIn} = action.payload
            state.username = username
            state.userType = userType
            state.userID = userID
            state.name = name
            state.email = email
            state.address = address
            state.phoneNumber = phoneNumber
            state.expenseCode = expenseCode
            //state.bookings = getUserBookings(userID);
        },
        addToBookings: (state, action) => {
            const {bookings} = action.payload
            state.bookings = bookings // Get from API and store here. 
            // Needed - Booking Date, Time, Location (Building Name + Address + Room)
            // Add to bookings here, after successfully putting into the database.
        }
    }
})

//BOOKING_ID:,BOOKING_DATE:,BOOKING_TIME:,GUESTS:, USER_ID:,ROOM_ID:,REVIEW_ID:
//1,"2018-01-25T00:00:00.000Z","2018-01-25T08:06:00.000Z",2,1,1,null
async function getUserBookings(id) {
    console.log("userBookings");
    const bookings = [{
      BOOKING_ID: 0,
      BOOKING_DATE: null,
      BOOKING_TIME: null,
      GUESTS: null, 
      USER_ID: null,
      ROOM_ID: null,
      REVIEW_ID: null
    }]
    const response = await fetch(`http://localhost:5000/bookings/?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(json => {
          const jsonRows = JSON.stringify(json.rows.rows);
          console.log(jsonRows);
          if (json.success) {
            bookings.push(
              { 
                BOOKING_ID: jsonRows.BOOKING_ID,
                BOOKING_DATE: jsonRows.BOOKING_DATE,
                BOOKING_TIME: jsonRows.BOOKING_TIME,
                GUESTS: jsonRows.GUESTS, 
                USER_ID: jsonRows.USER_ID,
                ROOM_ID: jsonRows.ROOM_ID,
                REVIEW_ID: jsonRows.REVIEW_ID
              }
            )
            return true;
          } else {
            return false;
          }
        });
      console.log("Bookings Response: " + response);
      console.log(bookings);
      return bookings;
}


// Exported actions and reducers
export const { userLoggedIn } = userInfoSlice.actions;

export default userInfoSlice.reducer;