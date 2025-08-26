import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom';
import './Pay.css';

const Pay = () => {
  const [payInfo, setPayInfo] = useState({ username: '', totalQuantity: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user and total quantity info from the backend
    const fetchPayInfo = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pay-info');
        const data = await response.json();
        setPayInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pay info:", error);
        setLoading(false);
      }
    };

    fetchPayInfo();
  }, []);

  return (
    <>
      <Nav />
      <div className="pay-container">
        <h1>Proceed to Payment</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {payInfo.totalQuantity > 0 ? (
              <div className="pay-info">
                <p><strong>Total Number of Items:</strong> {payInfo.totalQuantity}</p>
                <p><strong>Total Price to Pay:</strong> Rs. {payInfo.totalPrice.toFixed(2)}</p>
                <div className="button-container">
                  <button
                    className="proceed-to-pay-button"
                    onClick={() => {
                      alert("Payment done");
                      navigate("/paydone");
                    }}
                  >
                    Pay
                  </button>
                </div>
              </div>
            ) : (
              <p>No items added yet. Please add items to proceed with payment.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Pay;
