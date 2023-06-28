import { nanoid } from "nanoid";
import React, {useContext} from "react";

import { Context } from "./Context";
import InternetMovieDatabase from "../assets/images/InternetMovieDatabase.png"
import Metacritic from "../assets/images/Metacritic.png"
import RottenTomatoes from "../assets/images/RottenTomatoes.png"

export default function Movie({movie}){
    
    const {addToWatchlist, removeFromWatchlist, watchlist} = useContext(Context)
    const logos = [InternetMovieDatabase, RottenTomatoes, Metacritic]
    
    function getMovieRatingsHtml(data){
        const movieRatingsHtml = data.Ratings.map( (rating, index) => (
            <div key={nanoid()} className="movie-specs">
                <img className="emojify" src={logos[index]}/>
                <p className="movie-rating">{rating.Value}</p>
            </div>
        ))     
        return movieRatingsHtml
    }

    function checkWatchlist() {
        return watchlist.filter(item => item.imdbID === movie.imdbID).length
    }

    return(
        <div id={nanoid()} className="movie-container">
            <img className="movie-poster" src={movie.Poster} alt={`${movie.Title} poster`}/>
            <div className="movie-info">
                <div className="movie-title">
                    <h3>{movie.Title}</h3>
                </div>
                <div className="ratings-cnt">
                    {getMovieRatingsHtml(movie)}
                </div>
                <p className="movie-plot">{movie.Plot}</p>
                <div className="movie-bottom">
                    <div className="movie-det">
                        <p>{movie.Runtime}</p> 
                        <p>{movie.Year}</p>
                    </div>
                    <div id={`watchlist-decider-${movie.imdbID}`} className="watchlist-decider">
                        <i id={movie.imdbID} className={`fa-solid fa-circle-${checkWatchlist() > 0 ? "minus" : "plus"}`} onClick={checkWatchlist() > 0 ? removeFromWatchlist : addToWatchlist}></i>
                        <span className="icon-txt">{checkWatchlist() > 0 ? "Remove from watchlist" : "Add to watchlist"}</span>    
                    </div>
                </div>
            </div>
        </div>    
    )
}