import React, {useState, useEffect, useContext} from "react"

import loading from "../assets/images/loading-black.gif"
import { Context } from "../components/Context"

export default function Finder(){
    const [isLoading, setIsLoading] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSearched, setIsSearched] = useState(false)

    const {movieData, setMovieData, getMovieListHtml, movieListHtml} = useContext(Context)
    
    useEffect(() => {
        setMovieData([])
    }, [])

    useEffect(() => {
        setIsSearched(true)
        getMovieListHtml(movieData)
    },[movieData])

    async function search(){
        setIsSearched(false)
        setIsLoading(true)
        const movieTitle = document.getElementById("search-input").value.replace(" ", "+")
        const res = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&type=movie&page&apikey=a8acccd9`)
        const data = await res.json()
        console.log(data)
        if(data.Response === 'True'){
            setSearchResultsHtml(data.Search)
        }
        else{
            setIsLoading(false)
            setIsFailed(true)
        }
    }

    async function setSearchResultsHtml(data){
        const moviesArr = []
        for (let i=0; i<data.length; i++){
            const res = await fetch(`https://www.omdbapi.com/?i=${data[i].imdbID}&apikey=a8acccd9`)
            const omdbData = await res.json()
            moviesArr.push(omdbData)
        }
        console.log(moviesArr)
        setMovieData(moviesArr)
    }

    return(
        <main>
            <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input id="search-input" type="text" placeholder="Search for a movie..."/>
                <button id="search-btn" onClick={search}>Search</button>
            </div>
            {!isSearched && isLoading && <img className='loading' src={loading}/>}
            {!isLoading && isFailed && <p className="error-text placeholder-text">Unable to find what you are looking for. Please, try another search.</p>}
            {!isLoading && !isFailed && <div className="placeholder-wrapper">
                <i className="fa-solid fa-film"></i>
                <p className="placeholder-text">Start exploring</p>
            </div>}
            {isSearched && <div id="movie-list" className="movie-list">
                {movieListHtml}
            </div>}
        </main>
    )
}
