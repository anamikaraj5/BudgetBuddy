import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useProfile from "../hooks/Userprofile.js" 
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"

const Editprofile = () => {
    const { profile } = useProfile()
    const navigate = useNavigate()

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (profile) {
            setFullname(profile.fullname || "")
            setEmail(profile.email || "")
            setPhone(profile.phone || "")
        }
    }, [profile])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setError("")

        const confirmEdit = window.confirm('Are you sure you want to edit this profile?');
        if (!confirmEdit) return;

        try {
            const response = await fetch("/api/updateprofile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ FullName:fullname,Phone:phone }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Failed to update profile")
            } 
            else {
                alert("Profile updated successfully!")
                navigate("/viewprofile") 
            }
        } 
        
        catch (err) {
            console.error("Error:", err)
            setError("Something went wrong")
        }
    }

    return (
        <div className="bg-purple-200 min-h-screen">
            <Nav />
            <div className="md:flex">
                <Sidebar />

                <div>
                    <p className="md:mt-[20px] md:ml-[620px] mt-[40px] ml-[60px] text-5xl text-purple-950 font-bold">
                        Edit Profile
                    </p>

                    <form 
                        onSubmit={handleUpdate} 
                        className="flex flex-col gap-2 md:ml-[510px] ml-[10px] mt-[50px] px-[20px] pt-[30px] bg-white
                        h-[460px] w-[380px] md:w-[500px] rounded-lg text-2xl border-4 border-purple-950 
                        shadow-lg shadow-purple-900"
                    >
                        <label>
                            Full Name:
                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 p-2 w-full"
                                required
                            />
                        </label>

                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly
                                className="border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 p-2 w-full cursor-not-allowed"
                                required
                            />
                        </label>

                        <label>
                            Phone:
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-purple-950 border-3 hover:ring-3 hover:ring-purple-950 p-2 w-full"
                                required
                            />
                        </label>

                        <div className="flex justify-between mt-[30px] mx-[30px]">
                            <button
                                type="button"
                                className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 
                                border-purple-950 hover:bg-purple-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 
                                border-purple-950 hover:bg-purple-400"
                            >
                                Save
                            </button>
                        </div>

                        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editprofile
