import React, { useEffect, useState } from 'react';
import './CDisp.css';

const CDisp = () => {
  const [cartItems, setCartItems] = useState([]);
  const BE_URL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/cart/`);
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          console.error("Expected an array but got:", data);
          setCartItems([]); // Reset to empty array if data is not an array
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]); // Reset to empty array on error
      }
    };

    fetchCartItems();
  }, []);

  // Handle Decrementing the Quantity
  const handleDecrement = async (pid, weight, price) => {
    try {
      // Step 1: Decrement the quantity in Items collection
      const response = await fetch(`${BE_URL}/api/cart/${pid}/decrement`, {
        method: 'POST',
      });
      const data = await response.json();
  
      // Validate the response from the Items API
      if (Array.isArray(data)) {
        setCartItems(data); // Update state with the updated cart items
      } else {
        console.error('Invalid response format:', data);
      }
  
      // Step 2: Decrement details in the Details collection
      if (weight > 0 && price > 0) {
        await decDetailsQty(weight, price); // Call the decDetailsQty function
      } else {
        console.warn('Weight or price is already zero, skipping details decrement.');
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Function to Decrement Details
  const decDetailsQty = async (weight, price) => {
    try {
      const response = await fetch(`${BE_URL}/api/decrement-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight, price }), // Send weight and price of one item to decrement
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Details updated:', data.details);
      } else {
        console.error('Error decrementing details:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete Product
  const delProduct = async (pid, weight, price, quantity) => {
    try {
      console.log(`Deleting product with PID: ${pid}`);
  
      // Step 1: Delete the product from the cart
      const response = await fetch(`${BE_URL}/api/cart/${pid}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Deleted product from cart:', data.message);
  
        // Step 2: Call delDetailsProduct to update Details collection
        await delDetailsProduct(weight, price, quantity);
  
        // Step 3: Update the state in the frontend
        setCartItems((prevItems) => prevItems.filter((item) => item.pid !== pid));
      } else {
        console.error('Failed to delete product from cart:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  // Function to delete product details from Details database
  const delDetailsProduct = async (weight, price, quantity) => {
    try {
      const response = await fetch(`${BE_URL}/api/delete-from-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight, price, quantity }), // Send the product's weight, price, and quantity
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Details updated after deletion:', data.details);
      } else {
        console.error('Error updating Details:', data.message);
      }
    } catch (error) {
      console.error('Error deleting from Details:', error);
    }
  };


  return (
    <div className="cart-display">
      <h2>CART DETAILS</h2>
      <table>
        <thead>
          <tr>
            <th>SL. No.</th>
            <th>Product</th>
            <th>Total Weight</th>
            <th>Total Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.totalWeight.toFixed(3)} kg</td>
              <td>Rs. {item.totalPrice.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDecrement(item.pid, item.weight, item.price)}>Decrease Qty</button>
                <button className="delete-button" onClick={() => delProduct(item.pid, item.weight, item.price, item.quantity)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CDisp;
