import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { Account } from '../Schema/account.js'
import { User } from '../Schema/userdata.js'

const expensetrack = new Router()

// ADDING EXPENSE
expensetrack.post('/addexpense', authenticate, async(req, res) => {
    try {
        const {Category, Expense, Date} = req.body

        const user = await User.findOne({email: req.emails})
        if (!user) {
            return res.status(404).json({message:"User not found!!"})
        }

        let account = await Account.findOne({userEmail: user.email})

        if (!account) {
            account = new Account({ userEmail: user.email, expenses: [], budgets: [] })
        }

        if (!account.expenses) {
            account.expenses = []
        }

        const existingExpense = account.expenses.find(exp => exp.date === Date && exp.category === Category)

        if (existingExpense) {
            return res.status(200).json({message:"Expense details already added!!!"})
        }

        account.expenses.push({
            category: Category,
            amount: Expense,
            date: Date
        })

        await account.save()
        res.status(201).json({message:"Successfully added new expense...."})
    } 
    
    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error!!1"})
    }
})



//VIEW EXPENSE
    
expensetrack.get('/viewexpense', authenticate, async(req, res) => {
    try {
        const month = req.query.dates

        const account = await Account.findOne({userEmail: req.emails})
        if (!account) {
            return res.status(404).json({message: "User account not found!!"})
        }
        
        let TotalExpense = 0, TotalIncome = 0
        let expenses = []

        for (const entry of account.expenses) {
            if (entry.date.includes(month)) {
                expenses.push(entry)
                entry.category === 'Salary' ? (TotalIncome += entry.amount) : (TotalExpense += entry.amount)
            }
        }

        if (expenses.length===0) {
            return res.status(404).json({message: "No expense details found for the given month!!"})
        }

        res.status(200).json({expenses, TotalExpense, TotalIncome})
    } 
    
    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message: "Internal Server Error!!!"})
    }
})



// UPDATING EXPENSE
expensetrack.put('/updateexpense', authenticate, async(req, res) => {
    try {
        const {Category, Expense, Date} = req.body

        const account = await Account.findOne({userEmail: req.emails})
        if (!account) {
            return res.status(404).json({message:"Account not found for the user!!"})
        }

        const expense = account.expenses.find(exp => exp.date === Date && exp.category === Category)

        if (!expense) {
            return res.status(400).json({message:"Expense details not found!!"})
        }

        expense.amount = Expense

        await account.save()
        res.status(200).json({message:"Expense updated successfully......"})
    } 
    
    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error!!!"})
    }
})




// DELETING EXPENSE
expensetrack.delete('/deleteexpense', authenticate, async(req, res) => {
    try {
        const {Category, Date} = req.body

        const account = await Account.findOne({userEmail: req.emails})

        if (!account) {
            return res.status(404).json({message:"Account not found for the user!!!"})
        }

        const expenseIndex = account.expenses.findIndex(exp => exp.date === Date && exp.category === Category)

        if (expenseIndex === -1) {
            return res.status(404).json({message:"Expense details not found!!!"})
        }

        account.expenses.splice(expenseIndex, 1)

        await account.save()
        res.status(200).json({message:"Expense deleted successfully....."})
    } 

    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error!!!"})
    }
})



export {expensetrack}