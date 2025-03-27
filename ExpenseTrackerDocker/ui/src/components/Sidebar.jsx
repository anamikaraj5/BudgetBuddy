import React from 'react'
import { Link } from 'react-router-dom'

import records from '../assets/images/Records.svg'
import budgets from '../assets/images/Wallet.svg'
import addexp from '../assets/images/exp.svg'
import addbudg from '../assets/images/addbudg.svg'

const Sidebar = () => {
  return (
    <div>

                <div className="pt-[5px] flex gap-4 md:flex md:flex-col md:gap-8 md:mt-[20px] md:text-2xl md:font-medium ">
                    
                    <div className="flex flex-col">
                        <img src={addexp} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[10px]  "/>
                        <Link to={'/addexpense'} className="ml-[10px] md:ml-[20px] hover:text-3xl hover:bg-purple-950 hover:text-white ">Add Expense</Link>
                    </div>

                    <div className="flex flex-col ">
                        <img src={records} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[10px]"/>
                        <Link to={'/viewexpense'} className='md:ml-[20px] ml-[10px] hover:text-3xl hover:bg-purple-950 hover:text-white '>Records</Link>
                    </div>
                    
                    <div className="flex flex-col">
                        <img src={addbudg} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[10px]"/>
                        <Link to={'/addbudget'} className='md:ml-[20px] ml-[10px] hover:text-3xl hover:bg-purple-950 hover:text-white '>Add Budget</Link>
                    </div>

                    <div className="flex flex-col">
                        <img src={budgets} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[10px]"/>
                        <Link to={'/viewbudget'} className='md:ml-[20px] ml-[10px] hover:text-3xl hover:bg-purple-950 hover:text-white '>Budgets</Link>
                    </div>

                    
                </div>

    </div>
  )
}

export default Sidebar