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
            const { logged, user, accessTokken } = action.payload
            state.logged = logged
            state.user = user
            state.accessTokken = accessTokken
        },
        setVerified : (state , action) => {
            console.log(action.payload);
            state.user.verifyed = action.payload
        },
        logOut: () => {
           return initialState
        }
    }
})

export default auth.reducer

export const { setCredential,logOut , setVerified } = auth.actions
export const selectUserLogged = (state) => state.auth.logged
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentEmail = (state) => state.auth.user.email
export const selectCurrentPwd = (state) => state.auth.user.password
export const selectCurrentUserIsVerified = (state) => state.auth.user.verifyed
export const selectCurrentTokken = (state) => state.auth.tokken