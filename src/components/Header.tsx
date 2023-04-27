import React from 'react'
import { Link } from "react-router-dom";

export const Header: React.FC<{}> = () => {
    return (
        <>
            <div className='flex items-center justify-center py-2 bg-red-700'>
                <Link to='/'>
                    <div className='flex items-center'>
                        <p className='inline-block px-2 text-lg font-bold text-white border-2 border-white'>Y</p>
                        <p className='inline-block px-2 text-lg font-bold text-white'>Hacker News</p>
                    </div>
                </Link>
            </div>
        </>
    )
}