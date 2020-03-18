import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        name: "",
        loggedIn: false
    },
    reducers: {
        userLoggedIn: (state, action) => {
            const {name, loggedIn, role} = action.payload
            state.name = name
            state.loggedIn = loggedIn
        }
    }
})


// Exported actions and reducers
export const { userLoggedIn } = userInfoSlice.actions;

export default userInfoSlice.reducer;