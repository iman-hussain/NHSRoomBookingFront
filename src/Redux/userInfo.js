/*
  Developed by Liam Penn - 1415065
  Initialize user information and set reducers which can be called to change the userInfo state.
*/
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
        /* Change the state values when logged in */
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
        /* Reset user information to default when logged out */
        userLoggedOut: (state, action) => {
            state.username = ""
            state.userType = ""
            state.userID = ""
            state.name = ""
            state.email = ""
            state.address = ""
            state.phoneNumber = ""
            state.expenseCode = ""
            state.bookings = [[]]
        },
        /* Add a new booking to the array */
        addToBookings: (state, action) => {
            const {booking} = action.payload
            console.log(booking)
            state.bookings.push(booking) 
        },
        /* Overwrite the current bookings with the new bookings */
        setBookings: (state, action) => {
            const {bookings} = action.payload
            console.log(bookings)
            state.bookings = bookings
        }
    }
})

// Overwrite state using the received details.
export const getUserDetails = details => {
   return async dispatch => {
    dispatch(userLoggedIn({
      userID: details[0],
      userType: details[1],
      username: details[3],
      name: details[4] + " " + details[5],
      email: details[6],
      address: details[7],
      phoneNumber: details[9],
      expenseCode: details[9],
      bookings: details[10]
    }))
  } 
}
// Exported actions and reducers
export const { userLoggedIn, addToBookings, userLoggedOut, setBookings } = userInfoSlice.actions;

export default userInfoSlice.reducer;