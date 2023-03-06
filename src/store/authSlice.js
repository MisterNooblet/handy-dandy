import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    user: null,
    userExtras: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.userExtras = action.payload
        },
        updateToolbox: (state, action) => {
            state.userExtras.toolbox.push(action.payload)
        },
    }

})

export const { login, logout, updateUser, updateToolbox } = authSlice.actions;
export const selectUser = (state) => state.user.user
export default authSlice
