import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className='nav'>
                <NavLink to='/' className='title'>ChatApp</NavLink>
                <ul>
                    <li>
                        <NavLink to='/chatting'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
