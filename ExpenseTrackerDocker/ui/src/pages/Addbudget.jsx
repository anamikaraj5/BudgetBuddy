import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'

const Addbudget = () => {
  const [category, setCategory] = useState("")
  const [otherCategory, setOtherCategory] = useState("") 
  const [limit, setLimit] = useState("")
  const [month, setDate] = useState("") 

  const handleBudget = async (e) => {
    e.preventDefault()

    const finalCategory = category === "Others" ? otherCategory : category

    const confirmAdd = window.confirm('Are you sure you want to add this budget?')
    if (!confirmAdd) return

    try {
      const response = await fetch('/api/setbudget', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Category: finalCategory,
          Limit: Number(limit),
          Month: month, 
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(`Error adding budget: ${errorMessage}`)
      }
      
      alert("Budget added successfully!")

      setCategory("")
      setOtherCategory("") 
      setLimit("")
      setDate("")
    } 

    catch (err) {
      console.error(err)
      alert("Something went wrong: " + err.message)
    }
  }

  return (
    <div className='bg-purple-200 min-h-screen'>
      <Nav />
      <div className="md:flex">
        <Sidebar />

        <div className="md:ml-[550px] md:[30px] mx-[15px] mt-[40px] ">
          <p className="text-5xl text-purple-950 text-center font-bold">Set Budget</p>
          <form onSubmit={handleBudget} className="h-[500px] w-[380px] md:w-[500px] md:h-[520px] pt-[10px] mt-[30px] md:text-2xl rounded-lg border-4 bg-white border-purple-950 shadow-lg shadow-purple-900">
            <div className="flex flex-col gap-4 mx-[20px] mt-[10px]">
              <label>Category:</label>
              <select 
                className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 " 
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

              <label>Limit:</label>
              <input 
                type="number" 
                className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 "
                value={limit} 
                onChange={(e) => setLimit(e.target.value)} 
                required
              />

              <label>Month:</label>
              <input 
                type="month" 
                className="h-[40px] md:w-[450px] border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 "
                value={month} 
                onChange={(e) => setDate(e.target.value)}
                required 
              />
            </div>

            <div className="flex justify-between mt-[50px] mx-[30px]">
              <button type="button" className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl pt-[10px] border border-4 border-purple-950 hover:bg-purple-400">
                <Link to={'/home'}>CANCEL</Link>
              </button>
              <button type="submit" className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl pt-[10px] border border-4 border-purple-950 hover:bg-purple-400">
                SET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addbudget
