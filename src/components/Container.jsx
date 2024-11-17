import React from 'react';

// this is to make the container component responsive and centered

function Container({children}) {
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            {children}
        </div>
    )
}

export default Container;