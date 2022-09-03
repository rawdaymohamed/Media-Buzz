import express from 'express'
import mongoose from 'mongoose'
import config from './src/config'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './src/routes/user.routes'
import authRoutes from './src/routes/auth.routes'
import postRoutes from './src/routes/post.routes'
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: '*' }))
// app.use('/public', express.static(__dirname + '/public'))
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)
app.get('/', (req, res) => {
    res.send('Media Buzz Backend')
})

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}!!`)
})
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.name + ': ' + err.message })
    } else if (err) {
        res.status(400).json({ error: err.name + ': ' + err.message })
        console.log(err)
    }
    next()
})
// Database Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect database ${config.mongoUri}`)
})

