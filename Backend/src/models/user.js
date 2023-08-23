import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
    username: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String 
    },
    role: {
        type: String, 
        default: "member" 
    }
})

const User = mongoose.model("users", UserSchema)

export default User