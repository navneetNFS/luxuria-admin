import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    logged: null,
    user: null,
    tokken: null
}

const auth = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setCredential: (state, action) => {
            const { user, accessTokken } = action.payload
            state.user = user
            state.accessTokken = accessTokken
        },
        logOut: (state) => {
            state.user = null
            state.accessTokken = null
        }
    }
})

export default auth.reducer

export const { setCredential,logOut } = auth.actions
export const selectUserLogged = (state) => state.auth.logged
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentTokken = (state) => state.auth.tokken