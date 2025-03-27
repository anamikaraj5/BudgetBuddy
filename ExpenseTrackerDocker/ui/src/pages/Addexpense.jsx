import React, { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"

const Addexpense = () => {
  const [category, setCategory] = useState("")
  const [otherCategory, setOtherCategory] = useState("")
  const [expense, setExpense] = useState("")
  const [date, setDate] = useState("")

  const handleExpense = async (e) => {
    e.preventDefault()

    const finalCategory = category === "Others" ? otherCategory : category

    const confirmAdd = window.confirm('Are you sure you want to add this expense?')
    if (!confirmAdd) return

    try {
      const response = await fetch("/api/addexpense", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Category: finalCategory, Expense: expense, Date: date }),
      })

      if (!response.ok) {
        throw new Error("Error adding expense")
      }

      alert("Expense added successfully!!!")

      setCategory("")
      setOtherCategory("") 
      setExpense("")
      setDate("")
    } 
    
    catch (err) {
      console.error(err)
      alert("Something went wrong: " + err.message)
    }
  }

  return (
    <div>
      <Nav />
      <div className="md:flex bg-purple-200 min-h-screen">
        <Sidebar />

        <div>
          <p className="md:mt-[20px] md:ml-[630px] ml-[20px] mt-[40px] text-5xl text-purple-950 font-bold">
            Add Expense
          </p>

          <form
            onSubmit={handleExpense}
            className="flex flex-col gap-2 md:ml-[520px] ml-[10px] mt-[40px] px-[20px] pt-[30px] h-[500px] w-[380px] md:w-[500px] rounded-lg md:text-2xl border-4 bg-white border-purple-950 shadow-lg shadow-purple-900"
          >
            <label>Category</label>
            <select
              className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Furniture">Furniture</option>
              <option value="Fruits">Fruits</option>
              <option value="Clothing">Clothing</option>
              <option value="Pets">Pets</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Phone">Phone</option>
              <option value="Salary">Salary</option>
              <option value="Others">Others</option>
            </select>

            {category === "Others" && (
              <input
                type="text"
                className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 mt-2"
                placeholder="Enter custom category"
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                required
              />
            )}

            <label className="mt-[20px]">Expense</label>
            <input
              type="text"
              className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              required
            />

            <label className="mt-[20px]">Date</label>
            <input
                type="date"
                className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]} 
                required
              />


            <div className="flex justify-between mt-[30px] mx-[30px]">
              <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 border-purple-950 hover:bg-purple-400">
                <Link to={"/home"}>Cancel</Link>
              </button>
              <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 border-purple-950 hover:bg-purple-400">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addexpense


