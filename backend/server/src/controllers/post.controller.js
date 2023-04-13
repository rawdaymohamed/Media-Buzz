import formidable from 'formidable'
import fs from 'fs'
import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Post from '../models/post.model'
import User from '../models/user.model'
const create = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image couldn't be uploaded"
            })
        }

        const post = new Post(fields)
        post.postedBy = req.profile
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.filepath)
            post.photo.contentType = files.photo.type
        }
        try {
            const result = await post.save()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({ error: dbErrorHandler.getErrorMessage(error) })
        }
    })
}
const getPostPhoto = (req, res) => {
    if (req.post.photo.data) {
        res.set('Content-Type', req.profile.photo.contentType)
        return res.send(req.post.photo.data)
    }
    return res.json({ error: 'No photo available' })
}
const postByID = async (req, res, next, postId) => {
    try {
        const post = await Post.findById(postId).populate('postedBy', '_id name').exec()
        if (!post) return res.status(400).json({ error: "Sorry this post wasn't found" })
        req.post = post
        next()
    } catch (err) {
        return res.status(400).json({ error: "Couldn't get this post" })
    }
}
const getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.profile._id })
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json({ error: "Couldn't get posts" })
    }
}
const getRecommended = async (req, res) => {
    try {
        const followings = await User.findOne({ _id: req.params.userId }).select('following').exec()

        const posts = []
        for (const user of followings.following) {
            const userPosts = await Post.find({ postedBy: user })
            const userData = await User.findOne({ _id: user }).select('_id name photo').exec()
            posts.push({ user: userData, posts: userPosts })
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({ error: 'Cannot get recommended posts' })
    }
}
const addLike = async (req, res) => {
    try {
        const result = await Post.find({ _id: req.params.postId }).select('likes').exec()
        if (result[0].likes.includes(req.params.userId)) {
            return res.status(400).json({ error: 'Already liked the post' })
        }
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $push: { likes: req.params.userId } },
            { new: true }
        )
        return res.status(200).json(post)
    } catch (err) {
        return res.status(400).json({ error: 'Cannot like the post' })
    }
}
const removeLike = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likes: req.params.userId } },
            { new: true }
        )

        return res.status(200).json(post)
    } catch (err) {
        return res.status(400).json({ error: 'Cannot unlike the post' })
    }
}
const getNumLikes = async (req, res) => {
    try {
        const likes = await Post.find({ _id: req.params.postId }).select('likes').exec()

        return res.status(200).json({ numberOfLikes: likes[0].likes.length })
    } catch (err) {
        res.status(400).json({ error: 'Cannot get the number of likes' })
    }
}
const checkLiked = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })

        const post = await Post.findOne({ _id: req.params.postId })

        if (post.likes.includes(user._id)) return res.status(200).json({ liked: true })
        return res.status(200).json({ liked: false })
    } catch (err) {
        return res.status(400).json({ error: 'Cannot check liked post' })
    }
}
const createComment = async (req, res) => {
    try {
        const postId = req.params.postId
        const userId = req.params.userId
        const comment = { text: req.body.text }
        comment.postedBy = userId

        const result = await Post.findOneAndUpdate(
            { _id: postId },
            {
                $push: { comments: comment }
            },
            { new: true }
        )
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()

        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ error: 'Cannot create the comment' })
    }
}
const getCommentById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId }).select('comments').exec()
        for (const c of post.comments) {
            if (c._id == req.params.commentId) {
                return res.status(200).json(c)
            }
        }
        return res.status(404).json({ error: 'Comment not found' })
    } catch (err) {
        res.status(400).json({ error: 'Cannot get the comment' })
    }
}
const getAllCommentsPost = async (req, res) => {
    try {
        const comments = await Post.findOne({ _id: req.params.postId })
            .select('comments')
            .populate('comments.postedBy', '_id name')
            .exec()
        return res.status(200).json(comments)
    } catch (err) {
        return res.status(400).json({ error: 'Cannot get comments' })
    }
}
const updateComment = async (req, res) => {
    try {
        const result = await Post.findOneAndUpdate(
            { 'comments._id': req.params.commentId },
            {
                $set: {
                    'comments.$.text': req.body.text
                }
            },
            { new: true }
        )

        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ error: 'Cannot update comment' })
    }
}
const deleteComment = async (req, res) => {
    try {
        const result = await Post.findOneAndUpdate(
            { 'comments._id': req.params.commentId },
            {
                $pull: { comments: { _id: req.params.commentId } }
            },
            { safe: true }
        )
        return res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: 'Cannot delete comment' })
    }
}
export default {
    create,
    postByID,
    getPostsByUser,
    getPostPhoto,
    getRecommended,
    addLike,
    removeLike,
    getNumLikes,
    checkLiked,
    getCommentById,
    getAllCommentsPost,
    createComment,
    updateComment,
    deleteComment
}

