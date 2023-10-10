import { createSlice } from "@reduxjs/toolkit";

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: [],
    reducers: {
        setProductFilter(state,action){
            Array.from(action.payload).map((item)=>{
                state.push(item)
            })
        },
        clearProductFiler(){
            return [];
        }
    }
})

export default productFilterSlice.reducer

export const {setProductFilter,clearProductFiler} = productFilterSlice.actions