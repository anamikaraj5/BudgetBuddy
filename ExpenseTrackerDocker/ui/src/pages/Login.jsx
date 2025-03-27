import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import lavbg from '../assets/images/lavbg.jpg'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
   
    const navigate = useNavigate()
    
    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({Email:email,Password:password}),
            })

            if(!response.ok) {
                const errData = await response.json()
                throw new Error(errData.msg || 'Login failed')
            }

            navigate('/home')
        } 
        
        catch(err) {
            setError(err.message || 'Invalid credentials: Please try again!')
        }
    }

  return (
    <div>

        <div className="md:flex md:justify-center  gap-0 w-fit h-fit ml-[15px] mt-[100px] md:mt-[170px] md:ml-[540px] shadow-lg ring-purple-800 ring-3 shadow-purple-800 overflow-hidden rounded-lg">

        <div className="md:h-[550px] md:w-[400px]  bg-cover h-[60px]" 
            style={{ backgroundImage: `url(${lavbg})` }}>
            <p className="text-white  font-bold flex justify-center md:mt-[255px] text-5xl">
                WELCOME BACK
            </p>
        </div>

        <div className=" md:w-[400px] md:h-[550px] ">
        {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleLogin}>
                <p className="mt-[30px] text-center text-violet-900 text-4xl font-medium">LOGIN</p>

                <div className="flex flex-col ml-[30px] mt-[40px] mr-[30px]">
                    <label className="text-violet-600 text-xl">Email</label>
                    <input type="text" 
                            placeholder="Enter your email id" 
                            className="bg-purple-300 rounded-md border-solid border border-black h-[40px] mt-[20px] pl-[10px] placeholder:text-purple-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value) }
                            required
                    />
                </div>

                <div className="flex flex-col ml-[30px] mt-[40px] mr-[30px]">
                    <label className="text-violet-600 text-xl">Password</label>
                    <input type="password" 
                            placeholder="Enter your password" 
                            className="bg-purple-300 rounded-md border-solid border border-black h-[40px] mt-[20px] pl-[10px] placeholder:text-purple-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value) }
                            required
                    />
                </div>
                
                <button type="submit" className="bg-violet-900 text-white text-xl rounded-md h-[55px] w-[160px] mt-[60px] md:ml-[120px] ml-[100px] hover:bg-violet-500">Login</button>

                <div className="flex gap-3 ml-[120px] mt-[60px] mx-[20px]">
                    
                        <p className="text-violet-600">New User ?</p>
                
                        <Link to={'/signup'} className="text-purple-500">Register</Link>
                    
                </div>
            </form>
        </div>
        </div>

    </div>
  )
}

export default Login