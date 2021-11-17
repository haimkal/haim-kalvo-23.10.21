import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesWeather } from '../redux/AsyncThunk'
import systemConfig from '../SystemConfig'
import { UnitContext } from '../unit-context';
import FavoriteCard from './FavoriteCard/FavoriteCard'
import './Favorites.scss';

export default function Favorties() {

    const dispatch = useDispatch()
    const { unit } = useContext(UnitContext)
    const favorites = useSelector(({ favorites }) => favorites)

    useEffect(() => {
        dispatch(getFavoritesWeather())
    }, [])

    return (
        <div className="favorites-container">
            <main>
                <div className="favoriteCard-container row">
                    {favorites.map((fav, index) =>
                        <FavoriteCard
                            key={index}
                            city={fav.city}
                            country={fav.country}
                            temperature={fav.temperature[systemConfig[unit].fieldName].Value}
                            description={fav.weatherText}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}
