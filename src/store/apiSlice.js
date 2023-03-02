import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    countries: null,
    isLoading: false,
    error: null
}


export const fetchCountries = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all', {
            transformResponse: [
                (data) => {
                    const parsedData = JSON.parse(data)
                    const result = parsedData.map(country => country.name.common).sort()
                    const objectArr = result.map(country => { return { label: country } })
                    return objectArr
                }
            ]
        })
        const result = await response.data
        return result
    }
)


const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.isLoading = false
            state.countries = action.payload
        })
        builder.addCase(fetchCountries.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})


export const apiActions = apiSlice.actions
export default apiSlice