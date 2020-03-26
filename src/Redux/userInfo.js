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
        bookings: [[]]
    },
    reducers: {
        userLoggedIn: (state, action) => {
            const {username, userType, userID, name, email, address, phoneNumber, expenseCode, loggedIn, bookings} = action.payload
            console.log(action.payload)
            state.username = username
            state.userType = userType
            state.userID = userID
            state.name = name
            state.email = email
            state.address = address
            state.phoneNumber = phoneNumber
            state.expenseCode = expenseCode
            state.bookings = bookings
        },
        addToBookings: (state, action) => {
            const {bookings} = action.payload
            state.bookings = bookings // Get from API and store here. 
            // Needed - Booking Date, Time, Location (Building Name + Address + Room)
            // Add to bookings here, after successfully putting into the database.
        }
    }
})

export const getUserDetails = details => {
   return async dispatch => {
    dispatch(userLoggedIn({
      userID: details[0],
      username: details[1],
      userType: details[2],
      name: details[3] + " " + details[4],
      email: details[5],
      address: details[6],
      phoneNumber: details[7],
      expenseCode: details[8],
      bookings: details[9]
    }))
  } 
}
// Exported actions and reducers
export const { userLoggedIn, addToBookings } = userInfoSlice.actions;

export default userInfoSlice.reducer;