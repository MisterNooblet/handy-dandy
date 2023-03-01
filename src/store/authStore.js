import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const initialState = { id: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // signUp(state,) {
        //     const auth = getAuth();
        //     createUserWithEmailAndPassword(auth, email, password)
        //         .then((userCredential) => {
        //             // Signed in 
        //             const user = userCredential.user;
        //             // ...
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //             // ..
        //         });

        // }
    }
})

const store = configureStore({
    reducer: { auth: authSlice.reducer }
})


export const authActions = authSlice.actions
export default store;