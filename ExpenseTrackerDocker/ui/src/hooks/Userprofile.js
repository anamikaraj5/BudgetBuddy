import { useState,useEffect } from "react"

export default function useprofile()
{
    const [profile,setProfile] = useState(null)

    useEffect(()=>
    {
        const fetchprofile = async() =>
        {
            try{
                const res = await fetch('/api/viewprofile',{
                    credentials:'include'
                })


                if(res.ok)
                {
                    const data = await res.json()
                    setProfile(data) 
                    console.log(data)
                }
                else
                {
                    setProfile(null)
                }
            }

            catch(error)
            {
                console.error("Profile fetch error : ",error)
                setProfile(null)
            }
        }
        fetchprofile()
    },[])

    return {profile}
}