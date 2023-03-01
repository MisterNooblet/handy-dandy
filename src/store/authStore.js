import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { id: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.id = 1
        }
    }
})

const store = configureStore({
    reducer: { auth: authSlice.reducer }
})


export const authActions = authSlice.actions
export default store;