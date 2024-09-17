'use client'
import Notifications from '@/components/notifications/Notifications'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
  // const session=useSession();
  // const router=useRouter();
  // useEffect(()=>{  
  //   if(!session?.data?.user?.admin)
  //   router.push("/")
  // }     
  // ,[session]);
  return (
    <div className='text-black pt-[80px] bg-[#C8E8E0] h-screen'>
      <p className='py-24 text-center text-lg'>Hey Admin</p>
      <Notifications/>
    </div>
  )
}

export default AdminDashboard