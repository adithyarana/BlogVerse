import React from 'react';
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {

    const authstatus = useSelector((state) => state.auth.status)  // to know status 
    const navigate = useNavigate();  // to navigate to different pages

    // making the navigation bar 

    const navitems=[
        {
            name: 'Home',
            slug: '/',
            active:true
        },

        {
            name:'Login',
            slug: '/login',
            active:!authstatus,
        },

        {

            name:"SignUp",
            slug:'/signup',
            active:!authstatus,

        },

        {
            name:"All Posts",
            slug:"/all-posts",
            active:authstatus,

        },

        {
            name:"Add Post",
            slug:"/add-post",
            active:authstatus,
        },
    ]
        
   

    return (
  <header className="py-4 px-6 shadow-lg bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-white font-bold text-xl rounded-b-lg flex items-center justify-between">
    
    <Container>
        <nav className='flex'>
            <div className='mr-4'>
                <Link to='/'>
                <Logo width='70px' />
                </Link>
            </div>

            {/* // making the navigation bar items */}

           <ul className='flex ml-auto'>
            {navitems.map((item) =>
            item.active ?(
                <li key={item.name}>
                    <button
                    onClick={()=>navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100  rounded-full'
                    >{item.name}</button>
                </li>
            ) : null
            )}
            {authstatus &&(   // this is to show logout button only when user is logged in
                <li>
                    <LogoutBtn/>
                </li>
            )}
           </ul>

        </nav>
    </Container>
  </header>
    );
}

export default Header;