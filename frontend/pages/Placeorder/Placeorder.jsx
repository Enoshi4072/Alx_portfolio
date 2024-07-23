import React, { useContext, useEffect, useState } from 'react';
import './OrderPlacement.css'; // Renamed CSS file for variety
import { StoreContext } from '../../src/Context/StoreContext'; // Renamed context path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderPlacement = () => {
  const { calculateTotalAmount, authToken, itemsList, cart, apiUrl } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    const orderItems = itemsList.reduce((acc, item) => {
      if (cart[item._id] > 0) {
        acc.push({ ...item, quantity: cart[item._id] });
      }
      return acc;
    }, []);

    const orderDetails = {
      address: formData,
      items: orderItems,
      amount: calculateTotalAmount() + 2,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/order/create`, orderDetails, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert('Order placement failed.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || calculateTotalAmount() === 0) {
      navigate('/cart');
    }
  }, [authToken, calculateTotalAmount, navigate]);

  return (
    <form onSubmit={submitOrder} className="order-placement">
      <div className="order-info">
        <h2 className="section-title">Delivery Details</h2>
        <div className="form-group">
          <input required name="firstName" onChange={handleInputChange} value={formData.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={handleInputChange} value={formData.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={handleInputChange} value={formData.email} type="email" placeholder="Email Address" />
        <input required name="street" onChange={handleInputChange} value={formData.street} type="text" placeholder="Street Address" />
        <div className="form-group">
          <input required name="city" onChange={handleInputChange} value={formData.city} type="text" placeholder="City" />
          <input required name="state" onChange={handleInputChange} value={formData.state} type="text" placeholder="State" />
        </div>
        <div className="form-group">
          <input required name="zipcode" onChange={handleInputChange} value={formData.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={handleInputChange} value={formData.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={handleInputChange} value={formData.phone} type="text" placeholder="Phone Number" />
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <p>Subtotal</p>
          <p>${calculateTotalAmount().toFixed(2)}</p>
        </div>
        <hr />
        <div className="summary-item">
          <p>Shipping Fee</p>
          <p>${calculateTotalAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />
        <div className="summary-item">
          <b>Total</b>
          <b>${calculateTotalAmount() === 0 ? 0 : calculateTotalAmount() + 2}</b>
        </div>
        <button type="submit" className="payment-button">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default OrderPlacement;
