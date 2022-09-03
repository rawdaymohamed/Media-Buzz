import formidable from 'formidable'
import fs from 'fs'
import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Post from '../models/post.model.js'

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
export default { create, postByID, getPostsByUser }

