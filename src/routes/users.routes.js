import { Router } from "express";
import { generateToken } from "../utils/generateToken.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router()



router.post('/register', passportCall('register'), async (req, res) => {
    try {

        if (!req.user) return res.status(400).send('Registration failed')
        const token = generateToken(req.user)

        res.cookie('cookieProyecto', token, { httpOnly: true }).send('User registered')
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/login', passportCall('login'), async (req, res) => {
    try {

        if (!req.user) return res.status(400).send('Login failed')
        const token = generateToken(req.user)
        res.cookie('cookieProyecto', token, { httpOnly: true }).send('Login successful')
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/logout', (req, res) => {
    res.clearCookie('cookieProyecto').json({ message: "Logout successful" })

})

router.get('/current', passportCall('current'), (req, res) => {
    const {firstName, lastName} = req.user
    const payload = {
        firstName,
        lastName,
    }
    res.status(200).send(payload)
})




export default router
