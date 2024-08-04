import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './styles.css'
import { AppRouter } from './AppRouter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
)
