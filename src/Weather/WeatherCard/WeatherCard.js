import React from 'react';
import { useSelector } from 'react-redux';
import { isolateDayOfTheWeek } from '../assets/helpers/dateFunctions'
import './WeatherCard.scss'

export default function WeatherCard({ day, minTemp, maxTemp, description, symbol }) {

    const currentForecast = useSelector(({ currentForecast }) => currentForecast)
    return (
        <div className="col-12 col-lg-2">
            <div className="weatherCard">
                <div className="day-box">
                    <div className="day">{isolateDayOfTheWeek(day)}</div>
                </div>
                <div className="max-min-temp-box">
                    <div className="max-temp">
                        <div>Max: {Math.round(maxTemp)}{symbol}</div>
                    </div>
                    <div className="max-temp">
                        <div>Min: {Math.round(minTemp)}{symbol}</div>
                    </div>
                </div>
                <div className="description">
                    <div>{description}</div>
                </div>
            </div>
        </div>
    );
}


