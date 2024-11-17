import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

// this compponent is responsible for rendering a single post card


function PostCard({$id , title , featuredimage}) {
    return (
       <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4 '>
                <img src={service.getfilepreview(featuredimage)} alt={title} 
                 className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
       </Link>
    );
}

export default PostCard;