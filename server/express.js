import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'
// import MainRouter from './../client/MainRouter'
import theme from './../client/theme'
import Template from '../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// comment out before building for production
import devBundle from './devBundle'

import MainRouter from '../client/MainRouter'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()


// may comment out before building for production
devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],

            // add host name like this: https://az416426.vo.msecnd.net
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],

            styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
            imgSrc: ["'self'"], // add some ways or just "data"
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
          },
    })
)
app.use(cors())

// For Express to properly handle requests for static files,
// such as CSS files, images, or client-side embedded JS.
// With this configuration in place, when the Express app receives a request at a route
// starting with /dist, it will know to look for the requested static resource in the dist
// folder before returning the resource in the response. Now, we can load the bundled
// files from the dist folder in the frontend.
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)

// TO DO: make ssr routing (fix navigate warning)
app.get('*', (req, res) => {
    // res.status(200).send(Template())
    const cache = createCache({ key: 'css' })
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

    const context = {}

    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MainRouter />
                </ThemeProvider>
            </CacheProvider>
        </StaticRouter>
    )

    const emotionChunks = extractCriticalToChunks(markup);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  
    // Send the rendered page back to the client.
    res.status(200).send(Template({
        markup: markup,
        css: emotionCss
    }))
})

// We need the following code to handle the authorization errors that express-jwt
// produces when trying to verify JWT tokens in incoming requests,
// express-jwt throws an error named UnauthorizedError when a token cannot be
// validated for some reason. We catch this error here to return a 401 status back to the
// requesting client. We also add a response to be sent if other server-side errors are
// generated and caught here.

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ 'error': `${err.name}: ${err.message}`  })
    } else if (err) {
        res.status(400).json({ 'error': `${err.name}: ${err.message}`  })
        console.log(err)
    }
})

export default app