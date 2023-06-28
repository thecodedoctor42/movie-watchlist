import React, {useContext, useEffect} from "react"
import { Link } from "react-router-dom"

import { Context } from "../components/Context"

export default function Watchlist(){
    
    const {watchlist, getMovieListHtml, movieListHtml} = useContext(Context)

    useEffect(() => {
        getMovieListHtml(watchlist)
    }, [watchlist])
    
    
    return(
        <main>        
            {watchlist.length === 0 && <div className="placeholder-wrapper">
                <p className="placeholder-text">Your watchlist is looking a little empty...</p><br></br>
                <Link to="/Finder"><i className="fa-solid fa-circle-plus add-movies"></i>
                <span className="add-movies">Let's add some movies!</span></Link>
            </div>}
            {watchlist.length > 0 && <div className="movie-list">
                {movieListHtml}
            </div>}
        </main>
    )
}
