import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes.js'
import cartRoutes from './src/routes//cart.router.js'
import productRoutes from './src/routes/product.routes.js'
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
app.use('/api/carts', cartRoutes)
app.use('/api/products', productRoutes)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, () => {
    console.log('Server Open');    
})
