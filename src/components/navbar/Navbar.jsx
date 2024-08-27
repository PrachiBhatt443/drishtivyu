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
    pathname!=='/login'&&pathname!=='/register'
    &&
    <div className='h-full w-full z-50 fixed'>
      <div className='h-24 flex p-5 justify-between items-center bg-[#fafafa]'>
        <Link href={"/"}>
          <h2 className='text-2xl font-semibold'>Drishtivyu</h2>
        </Link>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-2xl'>
            &#9776;
          </button>
        </div>
        <div className='hidden md:flex space-x-4 items-center font-light'>
          <Link href='/' className='text-lg'>Home</Link>
          <Link href='/about' className='text-lg'>About</Link>
          <Link href='/services' className='text-lg'>Services</Link>
          <Link href='#' className='text-lg'>Contact</Link>
          <Link href='#'><Notifications/></Link>
          <Link href={"/login"} className='text-lg'>Login</Link>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 w-full font-light'>
          <div className='flex flex-col space-y-4 p-5'>
            <Link href='/' className='text-lg'>Home</Link>
            <Link href='/about' className='text-lg'>About</Link>
            <Link href='/services' className='text-lg'>Services</Link>
            <Link href='#' className='text-lg'>Contact</Link>
            <Link href='#'><Notifications/></Link>
            <Link href={"/login"} className='text-lg'>Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
