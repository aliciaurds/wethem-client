import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
//import styles 
import './index.css'
//import packages
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  //one for the routes and the other for the context to have all app
  <BrowserRouter>
  <AuthWrapper>
    <App />
    </AuthWrapper>
    </BrowserRouter>
  
)
