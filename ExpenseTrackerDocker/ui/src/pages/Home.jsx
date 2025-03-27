import React from 'react'
import Nav from "../components/Nav"
import records from '../assets/images/Records.svg'
import add from '../assets/images/Plus.png'
import charts from '../assets/images/charts.png'
import budgets from '../assets/images/Wallet.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' bg-purple-200 min-h-screen'>

        <Nav/>

        <div className="grid md:grid-cols-2 md:gap-9 gap-7 md:ml-[250px] md:mt-[100px] ml-[10px] mt-[40px] ">
            <div className="md:w-[500px] md:h-[250px] h-[150px] w-[370px] flex flex-col items-center justify-center md:border-[10px] border-[6px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg hover:bg-purple-400 ">
                <img src={records} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/viewexpense'}>RECORDS</Link></p>
            </div>

            <div className=" md:w-[500px] md:h-[250px] h-[150px] w-[370px] flex flex-col items-center justify-center md:border-[10px] border-[6px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg hover:bg-purple-400 ">
                <img src={add} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/addexpense'}>ADD EXPENSE</Link></p>
            </div>

            <div className="md:w-[500px] md:h-[250px] h-[150px] w-[370px] flex flex-col items-center justify-center md:border-[10px] border-[6px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg hover:bg-purple-400 ">
                <img src={charts} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/addbudget'}>ADD BUDGET</Link></p>
            </div>

            <div className=" md:w-[500px] md:h-[250px] h-[150px] w-[370px] flex flex-col items-center justify-center md:border-[10px] border-[6px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg hover:bg-purple-400 ">
                <img src={budgets} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/viewbudget'}>BUDGETS</Link></p>
            </div>

        </div>


    </div>
  )
}

export default Home