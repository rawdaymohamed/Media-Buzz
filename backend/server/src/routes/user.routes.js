import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
const router = express.Router()

router.route('/api/users').get(userCtrl.list).post(userCtrl.create)
router
    .route('/api/users/follow')
    .put(authCtrl.requireSigin, userCtrl.addFollowing, userCtrl.addFollower)
router
    .route('/api/users/unfollow')
    .put(authCtrl.requireSigin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.param('userId', userCtrl.userByID)
router
    .route('/api/users/:userId')
    .get(authCtrl.requireSigin, userCtrl.read)
    .put(authCtrl.requireSigin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSigin, authCtrl.hasAuthorization, userCtrl.remove)
router.route('/api/users/:userId/photo').get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/photos/defaultphoto').get(userCtrl.defaultPhoto)

export default router

