import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    emailVerified : null,
    otpGet : null,
    changePwd: null
}
const forgotPwd = createSlice({
    name: 'forgotPwd',
    initialState,
    reducers: {
        setEmailVerified(state,action){
            state.emailVerified = action.payload
        },
        setOtpGet(state,action){
            state.otpGet = action.payload
        },
        setChangePwd(state,action){
            state.changePwd = action.payload
        },
        resetForgotPwd(){
            return initialState
        }
    }
})

export default forgotPwd.reducer

export const {setEmailVerified,setOtpGet,setChangePwd,resetForgotPwd} = forgotPwd.actions

export const getEmailVerified = (state) => state.forgotPwd.emailVerified
export const getOtp = (state) => state.forgotPwd.otpGet
export const getChangePwd = (state) => state.forgotPwd.changePwd