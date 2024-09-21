'use client'
import Footer from '@/components/footer/Footer';
import React, { useEffect, useState } from 'react';
import { AiFillWarning } from "react-icons/ai"; // Icon for AQI Status
import { FaCloud, FaSpinner } from 'react-icons/fa'; // Icons for pollutants and spinner

const Airquality = () => {
  const [airQuality, setAirQuality] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'be501f847a36583561b10b049b488d16'; // Replace with your OpenWeather API key

  useEffect(() => {
    const fetchAirQuality = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          const data = await response.json();
          setLoading(false);

          if (data.list && data.list.length > 0) {
            setAirQuality(data.list[0]);
          } else {
            setError("No air quality data found.");
          }
        } catch (err) {
          setError("Error fetching air quality data.");
          setLoading(false);
        }
      }, (err) => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      });
    };

    fetchAirQuality();
  }, []);

  const getAirQualityStatus = (aqi) => {
    if (aqi === 1) return { status: "Good", color: "bg-green-100 text-green-800", icon: <FaCloud /> };
    if (aqi === 2) return { status: "Moderate", color: "bg-yellow-100 text-yellow-800", icon: <FaCloud /> };
    if (aqi === 3) return { status: "Unhealthy for Sensitive Groups", color: "bg-orange-100 text-orange-800", icon: <AiFillWarning /> };
    if (aqi === 4) return { status: "Unhealthy", color: "bg-red-100 text-red-800", icon: <AiFillWarning /> };
    if (aqi === 5) return { status: "Very Unhealthy", color: "bg-purple-100 text-purple-800", icon: <AiFillWarning /> };
    if (aqi === 6) return { status: "Hazardous", color: "bg-pink-100 text-pink-800", icon: <AiFillWarning /> };
    return { status: "Unknown", color: "bg-gray-100 text-gray-800", icon: <FaCloud /> };
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-[#C8E8E0] to-[#A1D4E4] py-40 flex justify-center items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Air Quality Index</h1>

        {loading ? (
          <div className="text-center text-2xl text-gray-500">
            <FaSpinner className="animate-spin mx-auto mb-4" size={30} />
            Fetching air quality data...
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : airQuality ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Air Quality Status:</h2>
            <div className={`flex items-center p-4 rounded-lg ${getAirQualityStatus(airQuality.main.aqi).color}`}>
              {getAirQualityStatus(airQuality.main.aqi).icon}
              <p className="ml-2 text-xl">{getAirQualityStatus(airQuality.main.aqi).status}</p>
            </div>
            <p className="mt-4 text-lg">AQI: {airQuality.main.aqi}</p>

            <details className="mt-4">
              <summary className="text-lg font-semibold cursor-pointer">See Components</summary>
              <ul className="ml-4 mt-2 space-y-2">
                <li>CO: {airQuality.components.co} µg/m³</li>
                <li>NO: {airQuality.components.no} µg/m³</li>
                <li>NO₂: {airQuality.components.no2} µg/m³</li>
                <li>O₃: {airQuality.components.o3} µg/m³</li>
                <li>SO₂: {airQuality.components.so2} µg/m³</li>
                <li>PM₂.₅: {airQuality.components.pm2_5} µg/m³</li>
                <li>PM₁₀: {airQuality.components.pm10} µg/m³</li>
                <li>NH₃: {airQuality.components.nh3} µg/m³</li>
              </ul>
            </details>
          </div>
        ) : (
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Airquality;
