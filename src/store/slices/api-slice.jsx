import { createSlice } from "@reduxjs/toolkit";

const api = createSlice({
    name: 'apiUrl',
    initialState : null,
    reducers : {
        setApiUrl : (state,action) => {
            return action.payload
        }
    }
})

export default api.reducer

export const {setApiUrl} = api.actions