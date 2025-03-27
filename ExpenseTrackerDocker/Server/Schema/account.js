import {Schema} from "mongoose"
import {model} from 'mongoose'


const accountSchema = new Schema({
    userEmail: { type: String, required: true, unique: true, ref: 'User' }, 
    expenses: [{
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: String, required: true }
    }],
    budgets: [{
        category: { type: String, required: true },
        limit: { type: Number, required: true },
        month: { type: String, required: true }
    }]
})

const Account = model('Account', accountSchema)

export {Account}