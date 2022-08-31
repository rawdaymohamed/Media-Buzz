import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()
router.route('/api/users').get(userCtrl.list).post(userCtrl.create)

router.param('userId', userCtrl.userByID)
router
    .route('/api/users/:userId')
    .get(authCtrl.requireSigin, userCtrl.read)
    .put(authCtrl.requireSigin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSigin, authCtrl.hasAuthorization, userCtrl.remove)

export default router

