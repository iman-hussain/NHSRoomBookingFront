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
        loggedIn: false,
        bookings: ["Initial Booking details"]
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
            state.loggedIn = loggedIn
            console.log(state)
        },
        getBookings: (state, action) => {
            const {bookings} = action.payload
            state.bookings = bookings // Get from API and store here. 
            // Needed - Booking Date, Time, Location (Building Name + Address + Room)
        }
    }
})


// Exported actions and reducers
export const { userLoggedIn } = userInfoSlice.actions;

export default userInfoSlice.reducer;