import React from 'react'
import lavbg from '../assets/images/lavbg.jpg'
import { Link } from 'react-router-dom'

const Front = () => {

  return (
    <div>

            <div className="bg-fixed bg-cover min-h-screen text-center" style={{ backgroundImage: `url(${lavbg})` }}>
            
                <p className="pt-[420px] text-5xl text-white font-bold  md:text-9xl ">BUDGET BUDDY</p>
                <p className="pt-[20px] text-white text-lg md:text-2xl">Track Smarter, Spend Better – Your Ultimate Budgeting Buddy!</p>
        
                <div className="flex flex-col mt-[60px] gap-5 justify-center  md:flex-row  md:gap-20">
                <Link to="/login" className="rounded-full px-[40px] py-2 font-bold text-white text-lg border flex justify-center items-center hover:bg-purple-600 md:px-[60px] md:text-xl">Login </Link>
                <Link to={'/signup'} className="rounded-full px-[40px] py-2 font-bold text-white text-lg border flex justify-center items-center hover:bg-purple-600  md:px-[60px] md:text-xl"> Register</Link>
                </div>
        
            </div>

    </div>
  )
}

export default Front