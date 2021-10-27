import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faHeart, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { ModeContext } from '../mode-context';
import Favorties from '../Favorites/Favorties';
import './Header.scss'

export default function Header() {
    const favoriteList = useSelector(({ favoriteList }) => favoriteList)
    const { mode, setMode } = useContext(ModeContext);
    const error = useSelector(({ error }) => error)

    function changeTheme() {
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    return (
        <header className="Header">
            {error ? <span className="errorMessage error-mobile">{error}</span> : null}
            <nav className="navbar navbar-expand-lg">
                <div className="container header-container">
                    <div className="logo-theme">
                        <Link to="/" className="nav-link d-md-none">
                            <FontAwesomeIcon icon={faCloudSun} className="fa-3x faCloudSun" />
                        </Link>
                        <Link to="/" className="navbar-brand d-none d-md-block">
                            What's the weather?
                        </Link>
                        <div onClick={changeTheme} className="theme-changer" title="Change theme">
                            <FontAwesomeIcon icon={faLightbulb} className="fa-2x faLightbulb" />
                        </div>
                    </div>
                    <div className="nav-favorites">
                        <Link className="favorites-link-container" disabled={!favoriteList.length} to="/favorites">
                            <FontAwesomeIcon icon={faHeart} className="fa-2x faHeartHeader" />
                            <div className="list-name d-none d-lg-block">Favorites List</div>
                        </Link>
                    </div>
                </div>
            </nav>
            {error ? <span className="errorMessage error-desktop">{error}</span> : null}
        </header >
    )
}
