import Link from 'next/link';
import React from 'react';
import { useUser } from '../context/user';

const Nav = () => {
    const {user} = useUser()
    return (
        <nav className='flex px-6 py-4 border-b-2 border-gray-800 space-x-5 mx-auto max-w-5xl w-full '>
            <Link href="/">
                <a className='text-2xl font-bold'>Home</a>
            </Link>
            <Link href="/pricing">
                <a className='ml-2 text-2xl font-bold'>Pricing</a>
            </Link>

            <Link href={user ? "/logout" : "/login"}>
                <a className='ml-auto text2xl font-bold'>{user ? "Logout" : "Login"}</a></Link>
        </nav>
    )
};

export default Nav;
