import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    uid: null,
    isAdmin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid
            state.isAdmin = action.payload.isAdmin
        },
    }
})


export const authActions = authSlice.actions
export default authSlice
