'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // Handle the checkbox change to mark feedback as resolved
  const handleCheckboxChange = async (id, resolved) => {
    try {
      await axios.put(`/api/feedback/${id}`, { resolved }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Update the local state to reflect the change
      setFeedbackList((prevData) =>
        prevData.map((feedback) =>
          feedback._id === id ? { ...feedback, resolved } : feedback
        )
      );
    } catch (error) {
      console.error('Error updating resolved status:', error);
    }
  };

  // Fetch feedback data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/feedback');
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#C8E8E0] py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Feedback Management</h1>
        
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-center">Resolved</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {feedbackList.map((feedback) => (
                <tr key={feedback._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{feedback.name}</td>
                  <td className="py-3 px-6 text-left">{feedback.feedbackType}</td>
                  <td className="py-3 px-6 text-left">{feedback.subject}</td>
                  <td className="py-3 px-6 text-left">{feedback.description}</td>
                  <td className="py-3 px-6 text-left">{new Date(feedback.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">{new Date(feedback.updatedAt).toLocaleString()}</td>
                  <td className="py-3 px-6 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={feedback.resolved}
                      onChange={() => handleCheckboxChange(feedback._id, !feedback.resolved)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
