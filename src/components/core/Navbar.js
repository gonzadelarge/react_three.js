import React from 'react'
import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__heading">
                <h3>
                    <Link className="navbar__logo" to="/">ThreeJS</Link>
                </h3>
            </div>
            <ul className="navbar__links">
                <li>
                    <NavLink exact activeClassName="navbar__link-active" className="navbar__link" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="navbar__link-active" className="navbar__link" to="/cube">Cube</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="navbar__link-active" className="navbar__link" to="/toroide">Toroide</NavLink>
                </li> <li>
                    <NavLink exact activeClassName="navbar__link-active" className="navbar__link" to="/shoes">Shoes</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="navbar__link-active" className="navbar__link" to="/sphere">Sphere</NavLink>
                </li>
            </ul>
        </nav>
    )
}
