import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Finder from './pages/Finder'
import Watchlist from './pages/Watchlist'


function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route
            exact
            path='/'
            element={<Watchlist />}
        />
        <Route
            path='/Finder'
            element={<Finder />}
        />
      </Routes>

    </div>
  )
}

export default App
