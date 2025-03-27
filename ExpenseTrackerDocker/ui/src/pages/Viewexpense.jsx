import { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import ExpenseCard from "../components/Expensecard"

const ExpenseTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [expenses, setExpenses] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  
const fetchExpenses = async (month) => {
    setLoading(true)
    setError("")

    try {
            const response = await fetch(`/api/viewexpense?dates=${month}`, 
            {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }        
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Failed to fetch expenses")
                setExpenses([])
                setTotalIncome(0)
                setTotalExpense(0)
            } 
            else {
                setExpenses(data.expenses)
                setTotalIncome(data.TotalIncome)
                setTotalExpense(data.TotalExpense)
            }
    } 
    
    catch (err) {
      console.error("Error:", err)
      setError("Something went wrong")
    } 
    
    finally {
      setLoading(false)
    }
  }

  const expenseMap = {}
  for (const expense of expenses) {
    if (!expenseMap[expense.date]) {
      expenseMap[expense.date] = []
    }
    expenseMap[expense.date].push(expense)
  }

  const expenseCards = []
  for (const date in expenseMap) {
    expenseCards.push(<ExpenseCard key={date} date={date} transactions={expenseMap[date]} />)
  }

  useEffect(() => {
    if (selectedMonth) {
        fetchExpenses(selectedMonth)
    }
    }, [selectedMonth])

  return (
    <div className="bg-purple-200 min-h-screen">
      <Nav />

      <div className="md:flex">
        <Sidebar />

        <div className="w-full p-6 ">
          <div className="md:flex justify-between items-center md:ml-[70px] ml-[10px] ">

            <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded-md md:h-[70px] md:text-2xl"
                    />

            <div className="md:text-3xl flex gap-8 font-bold text-purple-950">
              <p>Total Expense: ${totalExpense}</p>
              <p>Total Income: ${totalIncome}</p>
            </div>
          </div>

          {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
          {error && <p className="text-center mt-10 text-red-500">{error}</p>}

          {!loading && !error && expenseCards.length > 0 ? (
            expenseCards
          ) : (
            !loading && <p className="text-center mt-10">Please select any month....</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpenseTracker
