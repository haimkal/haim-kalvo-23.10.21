import { createReducer } from "@reduxjs/toolkit";
import { getCurrentWeather } from "./AsyncThunk"
const defaultState = {
    isLoading: false,
    city: {},
    forecast: {},
    weather: {},
    error: '',
}


export default createReducer(
    defaultState,
    (builder) => {
        builder.addCase(getCurrentWeather.pending, (state, action) => {
            state.error = ''
            state.isLoading = true
        }).addCase(getCurrentWeather.fulfilled, (state, action) => {
            state.error = ''
            state.isLoading = false
            state.currentWeather = action.payload.weather
            state.currentCity = action.payload.city
            state.currentForecast = action.payload.forecast

        }).addCase(getCurrentWeather.rejected, (state, action) => {
            state.error = action.payload
        })
    }

)