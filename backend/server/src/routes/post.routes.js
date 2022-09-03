import express from 'express'
import postCtrl from '../controllers/post.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
const router = express.Router()
router.param('userId', userCtrl.userByID)
router
    .route('/api/users/:userId/posts')
    .post(authCtrl.requireSigin, authCtrl.requireSigin, postCtrl.create)
    .get(authCtrl.requireSigin, postCtrl.getPostsByUser)

router.param('userId', userCtrl.userByID)

router.param('postId', postCtrl.postByID)
export default router

