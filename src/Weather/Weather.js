import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCity, getCurrentWeather } from '../redux/AsyncThunk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { dateBuilder } from './assets/helpers/dateFunctions';
import WeatherCard from './WeatherCard/WeatherCard';
import { UnitContext } from '../unit-context';
import './Weather.scss'
import systemConfig from '../SystemConfig'

export default function Weather() {
    const dispatch = useDispatch()
    const { unit, setUnit } = useContext(UnitContext)
    const currentWeather = useSelector(({ currentWeather }) => currentWeather)
    const favoriteList = useSelector(({ favoriteList }) => favoriteList)
    const currentCity = useSelector(({ currentCity }) => currentCity)
    const currentForecast = useSelector(({ currentForecast }) => currentForecast)
    const defaultCity = 'Tel Aviv'

    const getWeather = async (args) => {
        dispatch(getCurrentWeather(args))
    }
    let { cityName } = useParams()

    const changeUnit = (e) => {
        if (unit === 'Imperial') {
            setUnit('Metric')
        } else {
            setUnit('Imperial')
        }
    }

    const onSearchKeyDown = (e) => {
        if (e.key !== "Enter") return
        document.location.href = "/" + e.target.value
    }

    const addToFavorites = (cityName) => () => //Q1: why do you do that?
        dispatch(addFavoriteCity(cityName))

    useEffect(() => {
        getWeather({ unit, input: cityName || defaultCity })
    }, [unit])

    return (
        <div className="weather-container">
            <div className={(currentWeather) ? ((currentWeather.Temperature.Metric.Value > 16) ? "weather-container warm" : "weather-container") : "weather-container"}>
                <main>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search..."
                            onKeyDown={onSearchKeyDown} />
                    </div>
                    {!currentWeather ? <span className="typeMalfunction">City wasn't found, please try again</span> : null}
                    {currentWeather && <div className="row">
                        <div className="unitChange col-md-3">
                            <div className="unitName">{unit}</div>
                            <span className="changeUnit" onClick={changeUnit}> Change Unit! </span>
                        </div>
                        <div className="location-weather-time-container col-md-6">
                            <div className="location-box">
                                <div className="location">{currentCity.LocalizedName}, {currentCity.Country.LocalizedName}</div>
                            </div>
                            <div className="date-box">
                                <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(currentWeather.Temperature[systemConfig[unit].fieldName].Value)}{systemConfig[unit].symbol}
                                </div>
                                <div className="description">
                                    {currentWeather.WeatherText}
                                </div>
                            </div>
                        </div>
                        <div className="add-to-favorites col-md-3">
                            <div className="btn-container">
                                <button className="btnFav" onClick={addToFavorites(currentCity.LocalizedName)}>
                                    <FontAwesomeIcon icon={faHeart} className="fa-1x faHeart" />
                                    Add to Favorites!
                                </button>
                            </div>
                            {favoriteList.includes(currentCity.LocalizedName) && <div className="city-exists"> City exists in the list </div>}
                        </div>

                    </div>}
                    <div className="weatherCard-container">
                        <div className="row justify-content-center">
                            {(currentForecast || []).map((daily, index) => (
                                <WeatherCard key={index} symbol={systemConfig[unit].symbol} day={daily.day} maxTemp={daily.maxTemp} minTemp={daily.minTemp} description={daily.description} />))
                            }
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
