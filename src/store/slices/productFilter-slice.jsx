import { createSlice } from "@reduxjs/toolkit";
const initialData= {haveProduct: false,filteredProducts:[],message: ""}
const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: initialData,
    reducers: {
        setProductFilter(state,action){
            console.log(action.payload);
            // Array.from(action.payload).map((item)=>{
            //     state.push(item)
            // })
            return action.payload
        },
        clearProductFiler(){
            return initialData;
        }
    }
})

export default productFilterSlice.reducer

export const {setProductFilter,clearProductFiler} = productFilterSlice.actions