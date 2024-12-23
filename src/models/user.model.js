import mongoose from "mongoose";

const userShema = mongoose.Schema({
    email: {
        type: String,
        dafault: "",
        required: true
    },
    password: {
        type: String,
        dafault: "",
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: String,
        default: ""
    },
})

export default mongoose.model('user', userShema)