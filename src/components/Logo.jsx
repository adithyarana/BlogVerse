import React from 'react';
import { Link } from 'react-router-dom';


function Logo({width='100px'}) {
    return (
        <div  className='text-3xl font-bold text-black hover:text-blue-300 transition-all duration-300 transform hover:scale-105'>
         <Link to="/">BlogVerse</Link>
        </div>
    );
}

export default Logo;