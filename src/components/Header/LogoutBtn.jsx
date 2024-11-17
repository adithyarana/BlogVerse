import React from 'react';
import { useDispatch } from 'react-redux';
import authservice from '../../appwrite/auth';
import { logout } from '../../store/authslice';
import { useNavigate } from 'react-router-dom';  // this is needed because navigation 

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();  // to navigate to different pages

    const logouthandler=()=>{
        authservice.logout().then(()=>{
            dispatch(logout());
            navigate('/');
        })
    }

    return (
        
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
         onClick={logouthandler}>
        Logout
      </button>
      
        
    )
}

export default LogoutBtn;