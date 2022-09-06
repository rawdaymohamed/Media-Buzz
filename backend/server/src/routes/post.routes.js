import express from 'express'
import postCtrl from '../controllers/post.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
const router = express.Router()
router.param('userId', userCtrl.userByID)
router
    .route('/api/posts/:postId/comments/:commentId')
    .get(authCtrl.requireSigin, postCtrl.getCommentById)
router
    .route('/api/posts/:postId/comments')
    .post(authCtrl.requireSigin, postCtrl.createComment)
    .get(authCtrl.requireSigin, postCtrl.getAllCommentsPost)
router
    .route('/api/posts/:postId/users/:userId/likes')
    .post(authCtrl.requireSigin, postCtrl.addLike)
    .delete(authCtrl.requireSigin, postCtrl.removeLike)
router.route('/api/posts/:postId/likes').get(postCtrl.getNumLikes)
router.route('/api/posts/:postId/users/:userId/liked').get(postCtrl.checkLiked)
router
    .route('/api/users/:userId/posts')
    .post(authCtrl.requireSigin, authCtrl.hasAuthorization, postCtrl.create)
    .get(authCtrl.requireSigin, postCtrl.getPostsByUser)
router.route('/api/users/:userId/posts/:postId/photo').get(postCtrl.getPostPhoto)
router
    .route('/api/users/:userId/recommended/posts')
    .get(authCtrl.requireSigin, authCtrl.hasAuthorization, postCtrl.getRecommended)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router

