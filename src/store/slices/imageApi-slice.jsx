import { createSlice } from "@reduxjs/toolkit";

const imageApi = createSlice({
    name: 'imageAPI',
    initialState : null,
    reducers : {
        setImageApiUrl : (state,action) => {
            return action.payload
        }
    }
})

export default imageApi.reducer

export const {setImageApiUrl} = imageApi.actions