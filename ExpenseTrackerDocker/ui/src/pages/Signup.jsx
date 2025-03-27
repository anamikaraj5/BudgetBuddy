import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import lavbg from '../assets/images/lavbg.jpg'

const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]  = useState('')
    
    const navigate  = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('/api/signup',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({FullName:fullName,Email:email,Phone:phone,Password:password})
            })

            if(!response.ok) {
                const errData = await response.json()
                throw new Error(errData.msg || 'Signup failed')
            }

            navigate('/login')
        } 
        
        catch(err) {
            setError(err.message || 'Signup failed: Please try again!')
        }
    }


  return (
    <div>

            <div className="md:flex md:justify-center md:gap-0 w-fit md:mt-[150px] mt-[60px] mx-[5px] md:ml-[470px] shadow-lg ring-purple-800 ring-3 shadow-purple-800 overflow-hidden rounded-lg">

            <div className="md:h-[680px] md:w-[450px]  bg-cover h-[60px]" 
                style={{ backgroundImage: `url(${lavbg})` }}>
                <div className="text-white  font-bold md:flex md:flex-col justify-center  md:gap-6  md:ml-[150px] md:mt-[280px] md:text-5xl flex gap-3 pt-[10px] text-3xl">
                    <p>CREATE</p>
                    <p>YOUR</p>
                    <p>ACCOUNT</p>
                </div>
            </div>

            <div className="md:w-[450px] md:h-[550px] w-[400px]">
            {error && <p className='text-red-500 mb-4'>{error}</p>}  
                <form onSubmit={handleSignup}>
                    <p className="pt-[30px] text-center text-violet-900 text-4xl font-bold">REGISTER</p>

                    <div className="flex flex-col gap-2 mx-[30px] mt-[30px]">
                        <label className="text-violet-600 text-xl">Full Name</label>
                        <input type="text" 
                                placeholder="Enter your name" 
                                className="bg-purple-300 rounded-md border-solid border border-black h-[40px] pl-[20px] placeholder:text-purple-400"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                        />
                    </div>

                    <div className="flex flex-col gap-2 mx-[30px] mt-[30px]">
                        <label className="text-violet-600 text-xl">Email</label>
                        <input type="text" 
                                placeholder="Enter email id" 
                                className="bg-purple-300 rounded-md border-solid border border-black h-[40px] pl-[20px] placeholder:text-purple-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mx-[30px] mt-[30px]">
                        <label className="text-violet-600 text-xl">Phone</label>
                        <input type="text" 
                                placeholder="Enter phone number" 
                                className="bg-purple-300 rounded-md border-solid border border-black h-[40px] pl-[20px] placeholder:text-purple-400"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mx-[30px] mt-[30px]">
                        <label className="text-violet-600 text-xl">Password</label>
                        <input type="password" 
                                placeholder="Enter password" 
                                className="bg-purple-300 rounded-md border-solid border border-black h-[40px] pl-[20px] placeholder:text-purple-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="bg-violet-900 text-white text-xl rounded-md h-[45px] w-[150px] mt-[60px] md:ml-[160px] ml-[120px] hover:bg-violet-500">Register</button>

                    <div className="flex md:gap-6 mt-[40px] mx-[80px]">
                        <div >
                            <p className="text-violet-600">Already have an account ?</p>
                        </div>
                        <div>
                            <Link to={'/login'} className="text-purple-500">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
            </div>

    </div>
  )
}

export default Signup