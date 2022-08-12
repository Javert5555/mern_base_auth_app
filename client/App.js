import createCache from '@emotion/cache'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import theme from './theme'

const cache = createCache({ key: 'css' });

const App = () => {

    return (
        <Router>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </CacheProvider>
        </Router>
    )
}

export default hot(module) (App)