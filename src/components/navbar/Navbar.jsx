'use client'
import { Notifications } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname=usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    pathname!=='/login'
    &&
    <div className='h-full w-full fixed'>
      <div className='h-20 flex p-5 justify-between items-center bg-green-200'>
        <Link href={"/"}>
          <h2 className='text-2xl font-semibold'>City of Eutopia</h2>
        </Link>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-2xl'>
            &#9776;
          </button>
        </div>
        <div className='hidden md:flex space-x-4 items-center'>
          <Link href='/' className='text-lg font-semibold'>Home</Link>
          <Link href='/about' className='text-lg font-semibold'>About</Link>
          <Link href='/services' className='text-lg font-semibold'>Services</Link>
          <Link href='#' className='text-lg font-semibold'>Contact</Link>
          <Link href='#'><Notifications/></Link>
          <Link href={"/login"} className='text-lg font-semibold'>Login</Link>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 w-full bg-green-200'>
          <div className='flex flex-col space-y-4 p-5'>
            <Link href='/' className='text-lg font-semibold'>Home</Link>
            <Link href='/about' className='text-lg font-semibold'>About</Link>
            <Link href='/services' className='text-lg font-semibold'>Services</Link>
            <Link href='#' className='text-lg font-semibold'>Contact</Link>
            <Link href='#'><Notifications/></Link>
            <Link href={"/login"} className='text-lg font-semibold'>Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
