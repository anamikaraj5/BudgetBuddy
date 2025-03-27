import { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
import BudgetCard from "../components/Budgetcard.jsx"

const BudgetTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [budgets, setBudgets] = useState([])
  const [totalBudget, setTotalBudget] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchBudgets = async (month) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/viewbudget1?dates=${month}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to fetch budgets")
        setBudgets([])
        setTotalBudget(0)
        setTotalSpent(0)
        setTotalBalance(0)
      } 
      else {
        setBudgets(data.categories)
        setTotalBudget(data.total_budget)
        setTotalSpent(data.total_spent)
        setTotalBalance(data.total_balance)
      }
    } 
    
    catch (err) {
      console.error("Error:", err)
      setError(err.message)
    } 
    
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedMonth) {
      fetchBudgets(selectedMonth)
    }
  }, [selectedMonth])

  return (
    <div className="bg-purple-200 min-h-screen">
      <Nav />

      <div className="md:flex">
        <Sidebar />

        <div className="w-full md:p-6 pt-6">
          <div className="md:flex justify-between items-center md:ml-[70px] ml-[30px]">

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-md md:h-[70px] text-2xl"
            />

            <div className="md:text-3xl flex gap-8 font-bold ">
              <p className="text-purple-950">Total Budget: ${totalBudget}</p>
              <p className="text-purple-950">Total Spent: ${totalSpent}</p>
              <p className="text-red-600">Remaining Balance: ${totalBalance}</p>
            </div>
          </div>

          {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
          {error && <p className="text-center mt-10 text-red-500">{error}</p>}

          {!loading && !error && budgets.length > 0 ? (
            <BudgetCard date={selectedMonth} transactions={budgets} />
          ) : (
            !loading && <p className="text-center mt-10">Please select any month....</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BudgetTracker
