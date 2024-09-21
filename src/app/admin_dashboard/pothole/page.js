'use client'
import Footer from '@/components/footer/Footer';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const Pothole = () => {
  const [potholeData, setPotholeData] = useState([]);
  const session=useSession();
  const handleCheckboxChange = async (id, resolved) => {
    try {
      await axios.put(`/api/pothole/${id}`, { name:session?.data?.user?.name,resolved }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Update the local state to reflect the change
      setPotholeData((prevData) =>
        prevData.map((pothole) =>
          pothole._id === id ? { ...pothole, resolved } : pothole
        )
      );
    } catch (error) {
      console.error('Error updating resolved status:', error);
    }
  };
  useEffect(() => {
    // Fetch the pothole data when the component mounts using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pothole');
        setPotholeData(response.data);
      } catch (error) {
        console.error('Error fetching pothole data:', error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
    <div className='min-h-screen bg-[#C8E8E0] py-40'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Pothole Complaints</h1>
        
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className='min-w-full bg-white shadow-lg rounded-lg'>
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-center">Resolved</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {potholeData.map((pothole) => (
                <tr key={pothole._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{pothole.name}</td>
                  <td className="py-3 px-6 text-left">{pothole.location}</td>
                  <td className="py-3 px-6 text-left">{new Date(pothole.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">{new Date(pothole.updatedAt).toLocaleString()}</td>
                  <td className="py-3 px-6 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={pothole.resolved}
                      onChange={() => handleCheckboxChange(pothole._id, !pothole.resolved)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );

  // Handle the checkbox change
 
};

export default Pothole;
