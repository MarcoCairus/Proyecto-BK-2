import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes.js'
import mongoose from 'mongoose'
import initializePassport from './src/config/passport.config.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use('/api/users', usersRoutes)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, () => {
    console.log('Server Open');
    
})
