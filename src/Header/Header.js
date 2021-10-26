import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss'


export default function Header() {
    const favoriteList = useSelector(({ favoriteList }) => favoriteList)

    return (
        <header className="Header">
            <nav className="navbar navbar-expand-lg">
                <div className="header-container">
                    <Link disabled={!favoriteList.length} to="/favorites" className="nav-link">
                        Favorties
                    </Link>
                    <Link to="/" className="navbar-brand">
                        What's the weather?
                    </Link>
                </div>
            </nav>
        </header>
    )
}
