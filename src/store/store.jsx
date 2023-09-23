import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import apiSlice from "./slices/api-slice";

const store = configureStore(({
    reducer : {
        auth: authSlice,
        apiUrl : apiSlice
    }
}))

export default store