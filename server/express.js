import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import Template from '../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()


// comment out before building for production
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

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req, res) => {
    res.status(200).send(Template())
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