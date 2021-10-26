import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import './Header.scss'
import Favorties from '../Favorites/Favorties';

export default function Header() {
    const favoriteList = useSelector(({ favoriteList }) => favoriteList)

    return (
        <header className="Header">
            <nav className="navbar navbar-expand-lg">
                <div className="container header-container">
                    <Link to="/" className="nav-link d-md-none">
                        <FontAwesomeIcon icon={faCloudSun} className="fa-4x faCloudSun" />
                    </Link>
                    <Link to="/" className="navbar-brand d-none d-md-block">
                        What's the weather?
                    </Link>
                    <div className="nav-favorites">
                        <Link disabled={!favoriteList.length} to="/favorites">
                            <FontAwesomeIcon icon={faHeart} className="fa-4x faHeart" />
                        </Link>
                    </div>
                </div>
            </nav>
        </header >
    )
}
