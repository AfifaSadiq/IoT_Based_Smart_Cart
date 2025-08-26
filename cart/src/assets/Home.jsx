import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav'
import QRScanner from '../components/QRScanner';
import '../components/QRScanner.css';
import WScale from '../components/WScale';

const Home = () => {
  const [weightData, setWeightData] = useState(null); 
  const [error, setError] = useState(null); 
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const BE_URL = import.meta.env.VITE_BE_URL;
  const fetchWeightData = async () => {
    try {
      const response = await fetch(`${BE_URL}/getLatestWeight`); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeightData(data); 
      setLastFetchTime(new Date());
    } catch (error) {
      setError(error.message);
      console.error('Error fetching weight data:', error);
      setLastFetchTime(new Date());
    }
  };

  // Use useEffect to set up a polling mechanism
  useEffect(() => {
    const intervalId = setInterval(fetchWeightData, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <>
      <Nav />
      <div className="home-container">
        <QRScanner weightData={weightData} /> {/* Pass weight data as prop */}
        <div className="weight-section">
          <h2>Weight Data from Load Cells and ESP8266</h2>
          <WScale weight={weightData ? weightData.weight : 0} />
          {error && (
            <p className="weight-data-placeholder">Error: {error}</p>
          )}
          <div className="weight-data-time">
            <span>
              <span className="weight-data-placeholder">
                {weightData ? `Weight: ${weightData.weight} KG` : 'Loading...'}
              </span>
              <br />
              {lastFetchTime && (
                <>Last updated: {lastFetchTime.toLocaleTimeString()}</>
              )}
            </span>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
