'use client'
import { Notifications } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const session= useSession();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (session?.status === "authenticated") setisLoggedIn(true);
  }, [session]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  return (
    pathname !== '/login' && pathname !== '/register' && (
      <div className='w-full fixed z-50'>
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
            {session?.data?.user?.admin && <Link href='/admin_dashboard' className='text-lg'>Dashboard</Link>}
            <Link href='/services' className='text-lg'>Services</Link>
            <Link href='/contact' className='text-lg'>Contact</Link>

            {/* Profile section with dropdown */}
            {isLoggedIn ? (
              <div className='relative'>
                <button onClick={toggleProfileDropdown} className='flex items-center space-x-2'>
                  {/* <img
                    src={session?.user?.image || '/default-avatar.png'}
                    alt='profile'
                  /> */}
                  <div
                    className='w-8 h-8 rounded-full'
                  >
                    <Avatar/>
                  </div>
                  {/* <span>{session?.user?.name}</span> */}
                </button>

                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                    <Link href={'/user/'+session?.data?.user?.name} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>View Profile</Link>
                    <p onClick={signOut} className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100'>Logout</p>
                  </div>
                )}
              </div>
            ) : (
              <Link href={"/login"} className='text-lg'>Login</Link>
            )}
          </div>
        </div>

        {isOpen && (
          <div className='md:hidden absolute top-20 left-0 w-full font-light bg-white'>
            <div className='flex flex-col space-y-4 p-5'>
              <Link href='/' className='text-lg'>Home</Link>
              <Link href='/about' className='text-lg'>About</Link>
              {session?.data?.user?.admin && <Link href='/admin_dashboard' className='text-lg'>Dashboard</Link>}
              <Link href='/services' className='text-lg'>Services</Link>
              <Link href='/contact' className='text-lg'>Contact</Link>

              {isLoggedIn ? (
                <div className='relative'>
                  <button onClick={toggleProfileDropdown} className='flex items-center space-x-2'>
                  <div
                    className='w-8 h-8 rounded-full'
                  >
                    <Avatar/>
                  </div>
                  </button>

                  {isProfileOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                      <Link href={'/user/'+session?.data?.user?.name} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>View Profile</Link>
                      <p onClick={signOut} className='cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100'>Logout</p>
                    </div>
                  )}
                </div>
              ) : (
                <Link href={"/login"} className='text-lg'>Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Navbar;
