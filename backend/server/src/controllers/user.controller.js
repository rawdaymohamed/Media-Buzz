import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
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
    try {
        let user = req.profile
        user.updated = Date().now
        user = extend(user, req.body)
        await user.save()
        user.hashedPassword = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
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
export default { create, list, userByID, read, update, remove }

