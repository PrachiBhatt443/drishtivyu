'use client'
import Notifications from '@/components/notifications/Notifications'
import Link from 'next/link';
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className='pt-[80px] bg-[#F0F4F8] min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold text-gray-800 mb-12'>Admin Dashboard</h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl'>
        <Link href="/admin_dashboard/pothole">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pothole Complaints</h2>
            <p className="text-gray-600">Manage and view all pothole-related complaints submitted by users.</p>
          </div>
        </Link>

        <Link href="/admin_dashboard/feedback">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedbacks</h2>
            <p className="text-gray-600">Review user feedback and suggestions to improve services and infrastructure.</p>
          </div>
        </Link>
      </div>

      <div className='mt-12 w-full max-w-4xl'>
        {/* <Notifications /> */}
      </div>
    </div>
  )
}

export default AdminDashboard;
