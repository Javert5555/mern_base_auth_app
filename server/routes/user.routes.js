import { Router } from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = Router()

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// When calling any middleware on an endpoint containing the 'userId' parameter,
// the userByID function will work, which places the user object
// (whose _id corresponds to the id passed to this function)
// into the body of the req request, with a password value that is not defined

router.param('userId', userCtrl.userByID)

export default router