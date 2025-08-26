import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav'
import QRScanner from '../components/QRScanner';
import '../components/QRScanner.css';
import WScale from '../components/WScale';

const Home = () => {
  const [weightData, setWeightData] = useState(null); // State to hold weight data
  const [error, setError] = useState(null); // State to hold any error

  // Function to fetch weight data from the backend
  const fetchWeightData = async () => {
    try {
      const response = await fetch('http://localhost:3000/getLatestWeight'); // Use the correct server IP
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeightData(data); // Update state with the fetched data
    } catch (error) {
      setError(error.message);
      console.error('Error fetching weight data:', error);
    }
  };

  // Use useEffect to set up a polling mechanism
  useEffect(() => {
    const intervalId = setInterval(fetchWeightData, 2000); // Fetch every 2 seconds
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <>
      <Nav />
      <div className="home-container">
        <QRScanner weightData={weightData} /> {/* Pass weight data as prop */}
        <div className="weight-section">
          <h2>Weight Data from Load Cells and ESP8266</h2>
          <WScale weight={weightData ? weightData.weight : 0} />
          {error ? (
            <p className="weight-data-placeholder">Error: {error}</p>
          ) : (
            <p className="weight-data-placeholder">
              {weightData ? `Weight: ${weightData.weight} KG` : 'Loading...'}
            </p>
          )}
        </div>
        
      </div>
    </>
  );
};

export default Home;
