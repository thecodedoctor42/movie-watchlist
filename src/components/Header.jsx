import React from "react";
import {Link} from "react-router-dom"

export default function Header() {
    return (
        <header>
            <h1 className="title">Movie Watchlist</h1>
            <div className="navbar">
                <Link to="/Finder"><h2>Finder</h2></Link>
                <Link to="/"><h2>Watchlist</h2></Link>
            </div>
        </header>
    )
}