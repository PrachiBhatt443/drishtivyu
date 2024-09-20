'use client'
import { Notifications } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const session=useSession();
  const [logout,setLogout]=useState(false);
  useEffect(()=>{
    if(session.status==="authenticated")
    setLogout(true);
  },[session]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname=usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    pathname!=='/login'&&pathname!=='/register'
    &&
    <div className='w-full fixed'>
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
          {session?.data?.user?.admin&&<Link href='/admin_dashboard' className='text-lg'>Admin Dashboard</Link>}
          <Link href='/services' className='text-lg'>Services</Link>
          <Link href='#' className='text-lg'>Contact</Link>
          <Link href='#'><Notifications/></Link>
          {logout?<p className='cursor-pointer' onClick={signOut}>Logout</p>:<Link href={"/login"} className='text-lg'>Login</Link>}
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 w-full font-light'>
          <div className='flex flex-col space-y-4 p-5'>
            <Link href='/' className='text-lg'>Home</Link>
            <Link href='/about' className='text-lg'>About</Link>
            {session?.data?.user?.admin&&<Link href='/admin_dashboard' className='text-lg'>Admin Dashboard</Link>}
            <Link href='/services' className='text-lg'>Services</Link>
            <Link href='#' className='text-lg'>Contact</Link>
            <Link href='#'><Notifications/></Link>
            {logout?<p className='cursor-pointer' onClick={signOut}>Logout</p>:<Link href={"/login"} className='text-lg'>Login</Link>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
