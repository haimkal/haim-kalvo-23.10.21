import React, { useContext } from 'react'
import systemConfig from '../../SystemConfig';
import { Link } from 'react-router-dom';
import { UnitContext } from '../../unit-context';
import { useDispatch } from 'react-redux';
import { removeCityFromFavorites } from '../../redux/AsyncThunk'
import './FavoriteCard.scss'

export default function FavoriteCard(
    { city, country, temperature, description }
) {
    const { unit } = useContext(UnitContext)
    const dispatch = useDispatch()

    const removeCity = (city) => () => {
        dispatch(removeCityFromFavorites(city))
    }

    return (
        <div className="col-12 col-lg-3">
            <Link to={`/${city}`} >
                <div className={"favoriteCard"}>
                    <div className="favoriteCard__location-box">
                        <div className="favoriteCard__location-box__location">{city}, {country}</div>
                    </div>
                    <div className="favoriteCard__weather-box">
                        <div className="favoriteCard__weather-box__temp">
                            {Math.round(temperature)}{systemConfig[unit].symbol}
                        </div>
                        <div className="favoriteCard__weather-box__description">
                            {description}
                        </div>
                    </div>
                </div>
            </Link >
            <div className="deleteCard">
                <button onClick={removeCity(city)}>Delete</button>
            </div>
        </div >
    )
}
