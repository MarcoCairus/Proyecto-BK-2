import userModel from "../models/user.model.js";

export default class Users {

    constructor() {

    }
    registerUser = async (user) => {
        try {
            const result = await userModel.create(user)
            return result
        } catch (error) {
            // console.log(error)
            return { error: "Failed to register user" }
        }
    }

    findUserByEmail = async (email) => {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            console.log(error);
            return null;
        }
    };

}

