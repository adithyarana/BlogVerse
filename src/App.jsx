import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from'react-redux'
import authservice from './appwrite/auth'
import {login, logout} from './store/authslice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from'react-router-dom'




function App() {

const [loading , setloding]=useState(true)
const dispatch = useDispatch()

useEffect(()=>{

  authservice.getcurrentUser()
  .then((userdata)=>{
    if(userdata){
      dispatch(login({userdata}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=>setloding(false))

},[])

return !loading ?(
  <div className='min-h-screen flex flex-wrap 
  content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
       <Outlet/>
      </main>
      <Footer/>
    
    </div>
  </div>
): null

}

export default App
