import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    emailVerified : true,
    otpGet : false,
    changePwd: false
}
const forgotPwdSlice = createSlice({
    name: 'forgotPwd',
    initialState: initialValue,
    reducers: {
        
    }
})

export default forgotPwdSlice.reducer