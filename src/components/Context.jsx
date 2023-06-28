import React, {useState, createContext, useEffect} from "react";
import {nanoid} from "nanoid"

import Movie from "../components/Movie"

const Context = createContext()

function ContextProvider({children}){
    const [watchlist, setWatchlist] = useState(localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [])
    const [movieData, setMovieData] = useState([])
    const [movieListHtml, setMovieListHtml] = useState([])

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    function addToWatchlist(e){
        const movieID = e.target.id
        const targetMovie = movieData.filter(movie => {
            return movie.imdbID === movieID
        })[0]
        setWatchlist(prevWatchlist => ([
            ...prevWatchlist,
            targetMovie
        ]))
    }

    function removeFromWatchlist(e){
        const movieID = e.target.id
        setWatchlist(prevWatchlist => prevWatchlist.filter(movie => {
            return movie.imdbID !== movieID
        }))
    }

    
    function getMovieListHtml(data){
        setMovieListHtml( data.map(movie => (
            <Movie key={nanoid()} movie={movie}/>
        )))
    }

    return (
        <Context.Provider value={{watchlist, addToWatchlist, removeFromWatchlist, movieData, setMovieData, movieListHtml, getMovieListHtml}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}