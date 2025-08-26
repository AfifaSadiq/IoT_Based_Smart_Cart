import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './QRScanner.css';
import Nav from './Nav';
import { ScanLine } from 'lucide-react';

const QRScanner = ({ weightData }) => {
  const [scanResult, setScanResult] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [payInfo, setPayInfo] = useState({ finalWeight: 0, finalQuantity: 0, finalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [lastWeight, setLastWeight] = useState(null); // Track the last weight
  const [lastScannedProduct, setLastScannedProduct] = useState(null); // Track last scanned product
  const navigate = useNavigate();
  const BE_URL = import.meta.env.VITE_BE_URL;

  // Fetch payInfo when the component loads
  useEffect(() => {
    const fetchPayInfo = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/pay-info`);
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

  // Initialize the QR code scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 100, height: 100 },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      setScanResult(result);
      console.log(`Scanned Product ID: ${result}`);
      fetchProductDetails(result);

      // Reset last scanned product to allow new checks
      setLastScannedProduct(null);
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, []);

  // Fetch product details based on scanned product ID
  const fetchProductDetails = async (pid) => {
    try {
      const response = await fetch(`${BE_URL}/products/${pid}`);
      const data = await response.json();
      setProductDetails(data);
      console.log("Fetched Product Details:", data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Add to Cart Logic
  const addToCart = async () => {
    if (!productDetails || !weightData) {
      alert('Product details or weight data is missing!');
      return;
    }

    try {
      const { finalWeight } = payInfo; // Use the fetched finalWeight from /api/pay-info
      const calculatedWeight = productDetails.weight + finalWeight;

      // **Check if the product is already added without weight change**
      if (
        lastScannedProduct === productDetails.pid &&
        Math.abs(weightData.weight - lastWeight) <= 0.01
      ) {
        alert('The product is already added, or the weight has not changed!');
        return;
      }

      // Check if the calculated weight matches the weight from the ESP module
      if (Math.abs(calculatedWeight - weightData.weight) > 0.01) {
        alert(
          `The total weight (${calculatedWeight} KG) does not match the load cell reading (${weightData.weight} KG). Please verify the weights!`
        );
        return;
      }

      // Proceed to add the product to the cart
      const response = await fetch(`${BE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: productDetails.pid,
          title: productDetails.title,
          weight: productDetails.weight,
          price: productDetails.price,
        }),
      });

      const data = await response.json();
      console.log('Added to Cart:', data);

      // Update details in the backend
      const updateResponse = await fetch(`${BE_URL}/api/add-to-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: productDetails.pid,
          weight: productDetails.weight,
          price: productDetails.price,
        }),
      });

      const updateData = await updateResponse.json();
      console.log('Updated Details:', updateData);

      if (response.ok) {
        alert('Product added to cart successfully!');
        
        // **Update the last scanned product and weight**
        setLastScannedProduct(productDetails.pid);
        setLastWeight(weightData.weight);

        // Optionally clear product details to avoid confusion
        setProductDetails(null);
        setScanResult(null);
      } else {
        alert(data.errorMessage || 'Error adding product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to the cart.');
    }
  };

  return (
    <>
      <div className="QRCodeScanComp">
        <h2>QR Code Scanner</h2>
        <div id="reader"></div>
      </div>
      <div className="product-section">
        <h2>Product ID and Details</h2>
        {!scanResult && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#614d99', marginTop: 24 }}>
            <ScanLine size={64} />
            <span style={{ marginTop: 12, fontWeight: 500 }}>Scan a product to see details</span>
          </div>
        )}

        {/* If scan result is available but no product details */}
        {scanResult && !productDetails && (
          <div style={{ color: '#b85c00', fontWeight: 500, marginTop: 24 }}>
            Scan valid QR code
          </div>
        )}
        {scanResult && productDetails && (
          <div>
            <p><b style={{ color: '#ffffff' }}>Product ID: {scanResult}</b></p>
            <p style={{ backgroundColor: '#ec9b65ff'}}><b>Title: {productDetails.title}</b></p>
            <p style={{ backgroundColor: '#90c6d3ff'}}><b>Weight: {productDetails.weight} Kg</b></p>
            <p style={{ backgroundColor: '#f37abdff'}}><b>Price: Rs. {productDetails.price}</b></p>
          </div>
        )}


      </div>
      <div className="button-section">
        <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
        <button className="proceed-to-pay-button" onClick={() => navigate("/pay")}>Proceed to Pay</button>
      </div>
    </>
  );
};

export default QRScanner;
