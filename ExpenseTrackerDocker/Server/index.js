import express,{json} from 'express'
import dotenv from 'dotenv'
import {userauth} from './routes/userauth.js'
import {expensetrack} from './routes/expensetrack.js'
import {setbudget} from './routes/setbudget.js'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(json())

app.use('/',userauth)
app.use('/',expensetrack)
app.use('/',setbudget)

app.use(cors({
    origin:'*',
    credentials:true
}))

mongoose.connect('mongodb://mongodb:27017/Expensedocker').then(()=>
    {
        console.log("MongoBD connected successfully to Expense Tracker....")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed!!!",error)
    })

const PORT=process.env.PORT
app.listen(PORT,function()
{
    console.log(`Server is listening at port ${PORT}`)
})