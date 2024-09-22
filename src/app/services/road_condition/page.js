'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Footer from '@/components/footer/Footer';

const RoadCondition = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Preview the selected image
  const [location, setLocation] = useState(''); // For location input
  const [resultImage, setResultImage] = useState(null); // Store the processed result image
  const [potholeDetected, setPotholeDetected] = useState(null); // Detection status
  const [errorMessage, setErrorMessage] = useState(null); // Handle errors
  const [successMessage, setSuccessMessage] = useState(null); // Success message state
  const session = useSession();

  // Handle the image selection from the file input
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Create a preview URL for the selected image
    if (selectedImage) {
      const previewUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(previewUrl);
    }
  };

  // Handle form submission to upload the image and location to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset the error message on submit
    setSuccessMessage(null); // Reset success message on submit

    if (!image || !location) {
      setErrorMessage('Please provide both an image and a location.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('location', location);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming response contains result_image_url and pothole_detected
      setResultImage(response.data.result_image_url);
      setPotholeDetected(response.data.pothole_detected ? 'Pothole detected' : 'No pothole detected');

      // If a pothole is detected, send the location and user's name to another endpoint
      if (response.data.pothole_detected) {
        const name = session?.data?.user?.name;
        const location = e.target[0].value;
        console.log(location);

        try {
          const res = await axios.post('/api/pothole', { location, name }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setSuccessMessage('Location and user information submitted successfully.');
          console.log("Location and name sent successfully", res.data);
        } catch (err) {
          setErrorMessage('Error sending location and user information.');
          console.log("Error sending location and name:", err);
        }
      }
    } catch (error) {
      setErrorMessage('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
    <div className="py-40 px-4 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Pothole Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Input */}
          <div className="flex flex-col">
            <label htmlFor="location" className="font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col">
            <label htmlFor="gallery" className="font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              id="gallery"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Upload and Detect
          </button>
        </form>

        {/* Preview the selected image */}
        {previewImage && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-medium text-gray-700">Selected Image Preview</h3>
            <img src={previewImage} alt="Selected Image" className="mt-4 max-w-full rounded-md shadow-lg" />
          </div>
        )}

        {/* Display the result after detection */}
        {resultImage && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-medium text-gray-700">Detection Result</h3>
            <img src={resultImage} alt="Pothole Result" className="mt-4 max-w-full rounded-md shadow-lg" />
            <p className="mt-2 text-lg font-semibold text-gray-800">{potholeDetected === "Pothole detected" ? "Pothole Verified" : "No Pothole Detected"}</p>
          </div>
        )}
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default RoadCondition;
