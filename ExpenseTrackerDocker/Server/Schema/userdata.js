import {Schema} from "mongoose"
import {model} from 'mongoose'

const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true }
})

const User = model('User', userSchema)

export {User}