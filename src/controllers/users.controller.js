import { userService } from "../service/index.js";
import { generateToken } from "../utils/generateToken.js";
import { UserDTO } from '../dtos/user.dto.js';


export const createToken = async (req, res) => {
    try {

        if (!req.user) return res.status(400).send('Registration failed');
        const token = generateToken(req.user);
        res.cookie('cookieProyecto', token, { httpOnly: true }).send('User registered');

    } catch (error) {        
        res.status(400).send(error);
    }
}

export const loginUser = async (req, res) => {
    console.log('holaaaaa');
    
    try {
        if (!req.user) return res.status(400).send("Login failed");

        const token = generateToken(req.user);
        res.cookie("cookieProyecto", token, { httpOnly: true }).send("Login successful");
    } catch (error) {
        res.status(400).send(error);
    }
};



export const getCurrentUser = (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });

        const userDTO = new UserDTO(req.user);
        res.status(200).json(userDTO);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logoutUser = (req, res) => {
    res.clearCookie('cookieProyecto').json({ message: "Logout successful" });
};

