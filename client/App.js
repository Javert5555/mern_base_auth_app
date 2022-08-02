import { ThemeProvider } from '@mui/material'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import theme from './theme'

const App = () => {

    return (
        <div>
        <Router>
            <ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>
        </Router>
        </div>
    )
}

export default hot(module) (App)