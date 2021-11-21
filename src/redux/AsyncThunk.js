import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_ADD_FAVORITE_CITY, ACTION_GET_CURRENT_WEATHER, ACTION_GET_FAVORITE_WEATHER, ACTION_REMOVE_CITY_FROM_FAVORITES } from "./Actions"
import Cache from "../Cache"

const citiesCache = new Cache(24)
const weatherCache = new Cache(6)
const forcastCache = new Cache(12)

const api = {
    key: "amr9t5Yzdrh0rtXfGQnhUojvPEGo3yrn",
    base: document.location.protocol + "//dataservice.accuweather.com",
}

const getCity = async (input) => {
    const url = `${api.base}/locations/v1/cities/autocomplete?apikey=${api.key}&q=${input}`
    let cityResult = citiesCache.getCache(`City_${input}`)
    if (!cityResult) {
        cityResult = await fetch(url)
        cityResult = await cityResult.json()
        citiesCache.setCache(`City_${input}`, cityResult[0])
        cityResult = cityResult[0]
    }
    return cityResult
}

const getWeather = async (cityKey, input, countryName) => {
    const url = `${api.base}/currentconditions/v1/${cityKey}?apikey=${api.key}&details=true`
    let weatherResult = weatherCache.getCache(`Weather_${input}_${countryName}`)
    if (!weatherResult) {
        weatherResult = await fetch(url)
        weatherResult = await weatherResult.json()
        if (weatherResult && weatherResult[0]) {
            weatherResult = {
                WeatherText: weatherResult[0].WeatherText,
                Temperature: weatherResult[0].Temperature,
                Key: cityKey,
                CountryName: countryName,
                LocalizedName: input
            }

        }
        weatherCache.setCache(`Weather_${input}_${countryName}`, weatherResult)
    }
    return weatherResult
}

const getForecast = async (cityKey, input, unit) => {
    const url = `${api.base}/forecasts/v1/daily/5day/${cityKey}?apikey=${api.key}&metric=${unit === "Metric"}`
    let forecast = forcastCache.getCache(`Forecast_${input}_${unit}`)
    if (!forecast) {
        forecast = await fetch(url)
        forecast = await forecast.json()
        if (forecast) {
            forecast = forecast.DailyForecasts.map(daily => ({
                day: daily.Date,
                maxTemp: daily.Temperature.Maximum.Value,
                minTemp: daily.Temperature.Minimum.Value,
                description: daily.Day.IconPhrase
            }))
        }
        forcastCache.setCache(`Forecast_${input}_${unit}`, forecast)
    }
    return forecast
}

export const getCurrentWeather = createAsyncThunk(
    ACTION_GET_CURRENT_WEATHER.type,
    async ({ input, unit }, { rejectWithValue }) => {
        try {
            let weatherResult;
            let forecastResult;
            let cityResult = await getCity(input);

            if (cityResult) {
                weatherResult = await getWeather(cityResult.Key, input, cityResult.Country.LocalizedName)
            }
            if (cityResult) {
                forecastResult = await getForecast(cityResult.Key, input, unit)
            }
            return { //payload
                city: cityResult,
                weather: weatherResult,
                forecast: forecastResult,
            }
        }
        catch (e) {
            return rejectWithValue(e.message) //payload
        }
    }
)
export const addFavoriteCity = createAsyncThunk(
    ACTION_ADD_FAVORITE_CITY.type,
    async (city) => city
)

export const removeCityFromFavorites = createAsyncThunk(
    ACTION_REMOVE_CITY_FROM_FAVORITES.type,
    async (cityToDelete, { getState }) => {
        const favoriteList = (({ favoriteList }) => favoriteList)(getState())
        console.log(favoriteList[0].LocalizedName);
        let newFavoriteList = favoriteList.filter((city) => city.LocalizedName !== cityToDelete);
        const favorites = (({ favorites }) => favorites)(getState())
        let newFavorites = favorites.filter((city) => city.city !== cityToDelete);
        return {
            newFavoriteList,
            newFavorites
        }
    })

export const getFavoritesWeather = createAsyncThunk(
    ACTION_GET_FAVORITE_WEATHER.type,
    async (_, { rejectWithValue, getState }) => {
        const arrOfCities = (({ favoriteList }) => favoriteList)(getState())
        const results = []
        let resultsFromPromise = []
        const promiseRequests = []
        try {
            for (let city of arrOfCities) {
                let weatherResult
                promiseRequests.push(getWeather(city.Key, city.LocalizedName, city.Country.LocalizedName))
            }

            resultsFromPromise = await Promise.all(promiseRequests)
            resultsFromPromise.forEach(result =>
                results.push({ //payload
                    key: result.Key,
                    city: result.LocalizedName,
                    country: result.CountryName,
                    temperature: result.Temperature,
                    weatherText: result.WeatherText
                }))

            return results
        }
        catch (e) {
            return rejectWithValue(e.message) //payload
        }
    }
)