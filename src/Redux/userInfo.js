import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        name: "",
        loggedIn: false,
        bookings: ["Initial Booking details"]
    },
    reducers: {
        userLoggedIn: (state, action) => {
            const {name, loggedIn, role} = action.payload
            state.name = name
            state.loggedIn = loggedIn
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