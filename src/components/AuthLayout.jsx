import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// This component is designed to protect certain parts of your application, 
// ensuring that only authenticated users can access them. If a user is not authenticated, 
// they are redirected to the login page.


export default function Protected({children, authentication=true}) {

    const navigate= useNavigate()
    const [loader, setloader]=useState("")
    const authstatus = useSelector(state =>state.auth.status)


    useEffect(()=>{
        
        if(authentication && authstatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authstatus !== authentication){
            navigate("/login")
        }

        setloader(false)

    },[authstatus, navigate, authentication])


    return loader ? <h1>Loading...</h1> : <>{children}</>
    
}

