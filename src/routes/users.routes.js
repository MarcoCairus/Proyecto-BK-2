
import { passportCall } from "../utils/passportCall.js";
import { Router } from "express";
import { createToken, getCurrentUser, loginUser, logoutUser } from "../controllers/users.controller.js";  // Importa el controlador

const router = Router();

router.post('/register', passportCall('register'), createToken); 
router.post("/login", passportCall("login"), loginUser);
router.get('/logout', logoutUser);
router.get('/current', passportCall('current'), getCurrentUser);



export default router;