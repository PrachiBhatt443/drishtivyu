'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const Feedback = () => {
    const session=useSession();
    const [formData, setFormData] = useState({
        name: '',
        feedbackType: 'Suggestion',
        subject: '',
        description: '',
        location: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        formData.name=session?.data?.user?.name;
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (res.ok) {
          alert('Feedback submitted successfully');
          setFormData({
            name: '',
            feedbackType: 'Suggestion',
            subject: '',
            description: '',
            location: '',
          });
        } else {
          alert('Failed to submit feedback');
        }
      };
    
    return (
    <div className='min-h-screen bg-[#C8E8E0] py-40'>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">    
          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
            <select
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Other">Other</option>
            </select>
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="4"
            />
          </div>
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Location (Optional)</label>
            <input
              type="text"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
    </div>
);
}

export default Feedback