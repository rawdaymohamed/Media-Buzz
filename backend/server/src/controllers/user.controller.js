import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = async (req, res) => {
    try {
        const { email } = req.body
        let user = await User.findOne({ email })
        if (user) return res.status(400).send({ error: 'Email already exists' })
        user = new User(req.body)
        await user.save()
        return res.status(200).json({ message: 'Successfully signed up' })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        const users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        if (!user)
            return res.status(400).json({
                error: 'User not found'
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: 'Could not retrieve user'
        })
    }
}
const read = (req, res) => {
    req.profile.hashedPassword = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            })
        }
        let user = req.profile
        user = extend(user, fields)

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.filepath)
            user.photo.contentType = files.photo.type
        }
        try {
            await user.save()

            user.hashedPassword = undefined
            user.salt = undefined
            user.updated = Date.now()
            return res.json(user)
        } catch (error) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            })
        }
    })
}
const remove = async (req, res) => {
    try {
        const user = req.profile
        const deletedUser = await user.remove()
        deletedUser.hashedPassword = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set('Content-Type', req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile('profile-pic.png', { root: 'public' })
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { following: req.body.followId }
        })

        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const addFollower = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.body.userId } },
            { new: true }
        )
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()

        result.hashedPassword = undefined
        result.salt = undefined
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}
const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId } })

        next()
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}
const removeFollower = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.body.unfollowId,
            {
                $pull: { followers: req.body.userId }
            },
            { new: true }
        )
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.hashedPassword = undefined
        result.salt = undefined
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}
export default {
    create,
    list,
    userByID,
    read,
    update,
    remove,
    photo,
    defaultPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower
}

