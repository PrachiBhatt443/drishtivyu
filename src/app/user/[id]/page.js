'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Footer from '@/components/footer/Footer';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [unresolvedIssues, setUnresolvedIssues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const name = session?.user?.name;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!name) return;

      try {
        // Fetch user details and issues
        const [userResponse, issuesResponse] = await Promise.all([
          fetch(`/api/user/${name}`),
          fetch(`/api/user/issues/${name}`),
        ]);

        if (!userResponse.ok || !issuesResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const { resolved, unresolved } = await issuesResponse.json(); // Fetch resolved/unresolved separately

        setUser(userData);
        setResolvedIssues(resolved);
        setUnresolvedIssues(unresolved);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-40 px-3 md:px-0">
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
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-600 text-sm">Issues Raised</p>
                    <p className="text-xl font-bold text-gray-800">{resolvedIssues.length + unresolvedIssues.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
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

                {/* Resolved Issues Section */}
                <div className="mt-6">
                  <h4 className="text-2xl font-semibold text-green-600 mb-4">Resolved Issues</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {resolvedIssues.length > 0 ? (
                      resolvedIssues.map((issue, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow-md border-l-4 border-green-500">
                          <p className="text-lg font-bold text-gray-800">{issue.feedbackType || 'Pothole'}</p>
                          <p className="text-gray-600">{issue.subject || issue.location}</p>
                          <p className="text-sm text-gray-500">Resolved on: {new Date(issue.updatedAt).toLocaleDateString()}</p>
                        </div>
                      ))
                    ) : (
                      <p>No resolved issues</p>
                    )}
                  </div>
                </div>

                {/* Unresolved Issues Section */}
                <div className="mt-6">
                  <h4 className="text-2xl font-semibold text-red-600 mb-4">Unresolved Issues</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {unresolvedIssues.length > 0 ? (
                      unresolvedIssues.map((issue, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow-md border-l-4 border-red-500">
                          <p className="text-lg font-bold text-gray-800">{issue.feedbackType || 'Pothole'}</p>
                          <p className="text-gray-600">{issue.subject || issue.location}</p>
                          <p className="text-sm text-gray-500">Reported on: {new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))
                    ) : (
                      <p>No unresolved issues</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
