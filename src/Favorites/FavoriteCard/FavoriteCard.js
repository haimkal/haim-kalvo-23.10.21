import React, { useContext } from 'react'
import systemConfig from '../../SystemConfig';
import { UnitContext } from '../../unit-context';


export default function FavoriteCard(
    { city, country, temperature, description }
) {
    const { unit } = useContext(UnitContext)

    return (
        <div className="favoritesCard">
            <div className="location-box">
                <div className="location">{city}, {country}</div>
            </div>
            <div className="weather-box">
                <div className="temp">
                    {temperature}{systemConfig[unit].symbol}
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
        </div>
    )
}
