import passport from "passport"
import local from 'passport-local'
import jwt, { ExtractJwt } from 'passport-jwt'
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"


const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport = () => {

    passport.use('current', new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req && req.cookies ? req.cookies["cookieProyecto"] : null]),

            secretOrKey: process.env.SECRET_JWT
        },
        


        async (jwt_payload, done) => {
            try {

                return done(null, jwt_payload.user)

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, username, password, done) => {
            const { firstName, lastName, age } = req.body



            try {
                const user = await userModel.findOne({ email: username })
                console.log(user);
                


                if (user) return done(null, false, { message: 'User already exists' })

                const newUser = {
                    email: username,
                    password: createHash(password),
                    firstName,
                    lastName,
                    age,
                }

                const result = await userModel.create(newUser)

                return done(null, result)

            } catch (error) {
                return done(error)
            }
        }

    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {

                const user = await userModel.findOne({ email: username })
                if (!user) return done(null, false, { message: 'User does not exist' })
                if (!isValidPassword(user, password)) return done(null, false)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }


    ))

}

export default initializePassport