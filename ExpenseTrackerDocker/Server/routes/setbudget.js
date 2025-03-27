import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { Account } from '../Schema/account.js'
import { User } from '../Schema/userdata.js'

const setbudget = Router()

// SETTING BUDGET
setbudget.post('/setbudget', authenticate, async(req, res) => {
    try {
        const {Category, Limit, Month} = req.body

        const user = await User.findOne({email: req.emails})
        if (!user) {
            return res.status(404).json({message:"User not found!!!"})
        }

        let account = await Account.findOne({userEmail: user.email})

        if (!account) {
            account = new Account({ userEmail: user.email, expenses: [], budgets: [] })
        }

        if (!account.budgets) {
            account.budgets = []
        }

        const existingBudget = account.budgets.find(budget => budget.category === Category && budget.month === Month)

        if (existingBudget) {
            return res.status(400).json({message:"Budget already added!!"})
        }

        account.budgets.push({
            category: Category,
            limit: Limit,
            month: Month
        })

        await account.save()
        res.status(201).json({message:"Successfully added a budget..."})
    } 
    
    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error!!"})
    }
})


//VIEW BUDGET

setbudget.get('/viewbudget1', authenticate, async(req, res) => {
    try {
        const  monthname  = req.query.dates

        const account = await Account.findOne({userEmail: req.emails})

        if (!account) {
            return res.status(404).json({message:"Account not found!!"})
        }

        const Budgetdata = []
        for (const budget of account.budgets) 
        {
            if (budget.month === monthname) {
                Budgetdata.push(budget)
            }
        }

        if (Budgetdata.length === 0) {
            return res.status(404).json({message:"Budget details not found!!"})
        }

        let Totalbudget = 0, Totalspent = 0, Totalbalance = 0
        let Categorydata = []

        for (const budget of Budgetdata) 
        {
            let spent = 0
            for (const exp of account.expenses) 
            {
                if (exp.category === budget.category && exp.date.slice(0,7) === monthname) {
                    spent += exp.amount
                }
            }

            Totalbudget += budget.limit
            Totalspent += spent

            Categorydata.push({
                category: budget.category,
                budget: budget.limit,
                month:budget.month,
                spent: spent,
                remaining: budget.limit - spent,
                message: spent >= budget.limit ? "Budget limit reached!!" : ""
            })
        }

        Totalbalance = Totalbudget - Totalspent

        res.status(200).json({
            total_budget: Totalbudget,
            total_spent: Totalspent,
            total_balance: Totalbalance,
            categories: Categorydata
        })
    } 
    
    catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error!!"})
    }
})



// UPDATE BUDGET
setbudget.put('/updatebudget', authenticate, async(req, res) => {
    try {
        const {Category, Limit, Month} = req.body

        const account = await Account.findOne({userEmail: req.emails})

        if (!account) {
            return res.status(404).json({message:"Account not found!!"})
        }

        const budget = account.budgets.find(budget => budget.category === Category && budget.month === Month)

        if (!budget) {
            return res.status(404).json({message:"Budget details not found."})
        }

        budget.limit = Limit

        await account.save()
        res.status(200).json({message:"Budget updated successfully."})
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error."})
    }
})


//DELETE BUDGET

setbudget.delete('/deletebudget', authenticate, async (req, res) => {
    try {
        const { Category, Month } = req.body

        const account = await Account.findOne({ userEmail: req.emails })

        if (!account) {
            return res.status(404).json({message:"Account not found."})
        }

        const budgetIndex = account.budgets.findIndex(budget => budget.category === Category && budget.month === Month)

        if (budgetIndex === -1) {
            return res.status(404).json({message:"Budget details not found."})
        }

        account.budgets.splice(budgetIndex, 1)

        await account.save()
        res.status(200).json({message:"Budget deleted successfully."})
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({message:"Internal Server Error."})
    }
})


export{setbudget}