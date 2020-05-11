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
        addToBookings: (state, action) => {
            const {booking} = action.payload
            console.log(booking)
            state.bookings.push(booking) // Get from API and store here. 
            // Needed - Booking Date, Time, Location (Building Name + Address + Room)
            // Add to bookings here, after successfully putting into the database.
        },
        setBookings: (state, action) => {
            const {bookings} = action.payload
            console.log(bookings)
            state.bookings = bookings
        }
    }
})

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