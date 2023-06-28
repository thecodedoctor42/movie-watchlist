import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { ContextProvider } from './components/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Router>
      <App />
    </Router>,
  </ContextProvider>
)
