import { Router } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../Schema/userdata.js'
import { authenticate } from '../middleware/authenticate.js'

const userauth = Router()
dotenv.config()

// SIGNUP
userauth.post('/signup', async(req, res) => {
    try {
        const {FullName, Email, Phone, Password} = req.body

        const existingUser = await User.findOne({email: Email})
        if(existingUser) {
            return res.status(400).json({message:"User already exists"})
        }

        const newPassword = await bcrypt.hash(Password, 10)
        const newUser = new User({
            fullname: FullName,
            email: Email,
            phone: Phone,
            password: newPassword
        })

        await newUser.save()
        res.status(201).json({message:"Successfully Registered...."})
    } 
    
    catch(error) {
        res.status(500).json({message:"Internal Server Error!!!!"})
    }
})


// LOGIN
userauth.post('/login', async(req, res) => {
    try {
        const {Email, Password} = req.body

        const user = await User.findOne({email: Email})
        if(!user) {
            return res.status(400).json({message:"Email not registered"})
        }

        const result = await bcrypt.compare(Password, user.password)
        if (!result) {
            return res.status(401).json({message:"Unauthorized access"})
        }

        const token = jwt.sign({Email: user.email}, process.env.SECRET_KEY, { expiresIn: '10h'})
        res.cookie('userauthtoken', token, {httpOnly: true})
        res.status(200).json({message:"Successfully logged in"})
    } 
    
    catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})


// VIEW PROFILE

userauth.get('/viewprofile', authenticate, async(req, res) => {
    try {
        const emails = req.emails

        const user = await User.findOne({ email: emails })
        if (!user) {
            return res.status(400).json({message:"User not found"})
        }

        res.json({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone
        })
    } 
    
    catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

userauth.put('/updateprofile', authenticate, async (req, res) => {

    try {
        const {FullName,Phone } =req.body

        const user = await User.findOne({ email: req.emails })
        if (!user) {
            return res.status(400).json({message:"User not found"})
        }

        user.fullname=FullName
        user.phone=Phone

        await user.save()

        res.status(200).json({message:"User profile updated successfully."})
       
    } 
    catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
    
})


// LOGOUT
userauth.get('/logout', (req, res) => {
    res.clearCookie("userauthtoken")
    res.status(200).json({message:"Logging out"})
})


export { userauth }