import { createSlice } from "@reduxjs/toolkit";




const initialState = { id: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})


export const authActions = authSlice.actions
export default authSlice
