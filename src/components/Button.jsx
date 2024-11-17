import React from 'react';

// this components is to add button in another components we can add from here 


export default function Button({
    children,
    type="button",
    bgcolor="bg-blue-600",
    textcolor="text-white",
    className="",
    ...props
}) {
    return (
      <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`} {...props}>
            {children}
    </button>
    );
}

