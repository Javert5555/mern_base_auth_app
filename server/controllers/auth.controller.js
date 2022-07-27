import User from './../models/user.model'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config'

// The POST request object receives the email and password in req.body. This email is
// used to retrieve a matching user from the database. Then, the password
// authentication method defined in UserSchema is used to verify the password that's
// received in req.body from the client.
// If the password is successfully verified, the JWT module is used to generate a signed
// JWT using a secret key and the user's _id value.
// Then, the signed JWT is returned to the authenticated client, along with the user's
// details. Optionally, we can also set the token to a cookie in the response object so that
// it is available to the client-side if cookies are the chosen form of JWT storage. On the
// client-side, this token must be attached as an Authorization header when
// requesting protected routes from the server.

// path: /auth/signin, method: POST
const signin = async (req, res) => {
    try {
        let user = await User.findOne({ 'email': req.body.email })

        if (!user) {
            return res.status(401).json({ error: 'User not found' })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: 'Email and password don\'t match.'})
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)

        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(401).json({ message: 'Could not signin' })
    }
}

// The signout function clears the response cookie containing the signed JWT.

// path: /auth/signout, method: GET
const signout = async (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: 'signed out'
    })
}

// The requireSignin method in auth.controller.js uses express-jwt to verify
// that the incoming request has a valid JWT in the Authorization header. If the token
// is valid, it appends the verified user's ID in an 'auth' key to the request object;
// otherwise, it throws an authentication error.

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: 'auth'
})

// For some of the protected routes, such as update and delete, on top of checking for
// authentication we also want to make sure the requesting user is only updating or
// deleting their own user information.
// To achieve this, the hasAuthorization function defined in auth.controller.js
// will check whether the authenticated user is the same as the user being updated or
// deleted before the corresponding CRUD controller function is allowed to proceed

const hasAuthorization = async (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
    next()
}

export default { signin, signout, requireSignin, hasAuthorization }