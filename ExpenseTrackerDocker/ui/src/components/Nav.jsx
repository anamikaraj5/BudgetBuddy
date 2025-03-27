import React from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/logo.svg"
import useProfile from "../hooks/Userprofile.js"

const Nav = () => {
    const { profile } = useProfile()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "GET",
                credentials: "include",
            })

            if (response.ok) {
                alert("Logged out successfully!")
                navigate("/front") 
            } 
            else {
                console.error("Logout failed")
            }
        } 
        
        catch (error) {
            console.error("Error during logout:", error)
        }
    }

    return (
      
            <div className="flex items-center gap-3 bg-purple-950 px-[5px] h-[90px] w-full text-sm md:h-[90px] md:text-3xl md:justify-between md:pr-[50px]">
                <div className="flex items-center gap-2">
                    <img className="m-1 p-2 size-12 md:size-18" src={logo} alt="logo" />
                    <p className="text-white font-bold">Budget Buddy</p>
                </div>

                <div className="flex gap-2 md:gap-6 text-white">
                    <Link to="/home" className="hover:text-5xl hover:bg-purple-500">Home</Link>
                    <button 
                        onClick={handleLogout} 
                        className="hover:text-5xl hover:bg-purple-500"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex justify-end gap-1 md:gap-3">
                    <p className="text-white md:mt-[10px] mt-[5px] font-bold md:hover:bg-red-700">
                        <Link to="/viewprofile">Welcome, {profile ? profile.fullname : "Guest"}!</Link>
                    </p>
                </div>
            </div>
     


    )
}

export default Nav
