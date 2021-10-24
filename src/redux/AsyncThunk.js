import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_GET_CURRENT_WEATHER } from "./Actions"
import Cache from "../Cache"

const citiesCache = new Cache(24)
const weatherCache = new Cache(6)
const forcastCache = new Cache(12)

const api = {
    key: "efr5pc0wjThqCLr8p6CLnStsUmWjK5A1",
    base: "http://dataservice.accuweather.com",
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

const getWeather = async (cityKey) => {
    const url = `${api.base}/currentconditions/v1/${cityKey}?apikey=${api.key}&details=true`
    let weatherResult = weatherCache.getCache(`Weather_${cityKey}`)
    if (!weatherResult) {
        weatherResult = await fetch(url)
        weatherResult = await weatherResult.json()
        if (weatherResult && weatherResult[0]) {
            weatherResult = {
                WeatherText: weatherResult[0].WeatherText,
                Temperature: weatherResult[0].Temperature,
            }

        }
        weatherCache.setCache(`Weather_${cityKey}`, weatherResult)
    }
    return weatherResult
}

const getForecast = async (cityKey) => {
    const url = `${api.base}/forecasts/v1/daily/5day/${cityKey}?apikey=${api.key}&metric=true`
    let forecast = forcastCache.getCache(`Forecast_${cityKey}`)
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
        forcastCache.setCache(`ForecaST_${cityKey}`, forecast)
    }
    return forecast
}

export const getCurrentWeather = createAsyncThunk(
    ACTION_GET_CURRENT_WEATHER.type,
    async (input, { rejectWithValue, getState }) => {
        try {
            let weatherResult
            let forecastResult
            let cityResult = await getCity(input)

            if (cityResult) {
                weatherResult = await getWeather(cityResult.Key)
            }
            if (cityResult) {
                forecastResult = await getForecast(cityResult.Key)
            }
            return {
                city: cityResult,
                weather: weatherResult,
                forecast: forecastResult,
            }
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const getFavoritesWeather = createAsyncThunk(
    ACTION_GET_CURRENT_WEATHER.type,
    async (arrOfCityNames, { rejectWithValue, getState }) => {

        const results = []
        try {
            arrOfCityNames.forEach(async (input) => {
                let weatherResult
                let cityResult = await getCity(input)

                if (cityResult) {
                    weatherResult = await getWeather(cityResult.Key)
                }
                results.push({
                    city: cityResult,
                    weather: weatherResult,
                })
            })
            return results
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)