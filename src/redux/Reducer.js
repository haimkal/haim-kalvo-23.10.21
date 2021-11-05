import { createReducer } from "@reduxjs/toolkit";
import { addFavoriteCity, getCurrentWeather, getFavoritesWeather, removeCityFromFavorites } from "./AsyncThunk"
const defaultState = {
    isLoading: false,
    city: {},
    favorites: [],
    favoriteList: JSON.parse(localStorage.getItem('favoriteList') || "[]"),
    forecast: {},
    weather: {},
    error: '',
}

export default createReducer(
    defaultState,
    (builder) => {
        builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
            state.error = ''
            state.isLoading = false
            state.currentWeather = action.payload.weather
            state.currentCity = action.payload.city
            state.currentForecast = action.payload.forecast
        }).addCase(getCurrentWeather.rejected, (state, action) => {
            state.currentForecast = undefined
            state.error = action.payload

        }).addCase(getFavoritesWeather.fulfilled, (state, action) => {
            state.error = ''
            state.favorites = action.payload

        }).addCase(getFavoritesWeather.rejected, (state, action) => {
            state.error = action.payload

        }).addCase(addFavoriteCity.fulfilled, (state, action) => {
            state.error = ''
            if (!state.favoriteList.includes(action.payload)) {
                state.favoriteList = [...state.favoriteList, action.payload]
                localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
            }
        }).addCase(removeCityFromFavorites.fulfilled, (state, action) => {
            state.error = ''
            state.favoriteList = action.payload.newFavoriteList
            state.favorites = action.payload.newFavorites
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList))
        })
    }
)