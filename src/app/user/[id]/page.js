'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // get session data
  const name = session?.user?.name;

  useEffect(() => {
    const fetchUser = async () => {
      if (!name) return;

      try {
        const response = await fetch(`/api/user/${name}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-40">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Dashboard</h2>

          {user && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`} 
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Merits</p>
                  <p className="text-xl font-bold text-gray-800">{user.merits}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Admin Status</p>
                  <p className="text-xl font-bold text-gray-800">{user.admin ? 'Admin' : 'User'}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm col-span-2">
                  <p className="text-gray-600 text-sm">Account Created</p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm col-span-2">
                  <p className="text-gray-600 text-sm">Last Updated</p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
