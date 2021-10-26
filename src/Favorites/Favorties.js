import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesWeather } from '../redux/AsyncThunk'
import systemConfig from '../SystemConfig'
import { UnitContext } from '../unit-context';
import FavoriteCard from './FavoriteCard/FavoriteCard'

export default function Favorties() {
    const dispatch = useDispatch()
    const { unit, setUnit } = useContext(UnitContext)
    const favorites = useSelector(({ favorites }) => favorites)
    useEffect(() => {
        dispatch(getFavoritesWeather())
    }, [])
    return (
        <div className="col-12 col-lg-2">
            {(favorites || []).map((fav, index) =>
                <FavoriteCard
                    key={index}
                    city={fav.city.LocalizedName}
                    country={fav.city.Country.LocalizedName}
                    temperature={fav.weather.Temperature[systemConfig[unit].fieldName].Value}
                    description={fav.weather.WeatherText}
                />)}
        </div>

    )

}
