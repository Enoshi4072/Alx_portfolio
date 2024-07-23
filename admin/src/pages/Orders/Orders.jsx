import React, { useEffect, useState } from 'react';
import './Orders.css'; // Import the refactored CSS
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url }) => {
  const [ordersList, setOrdersList] = useState([]); // Use a more descriptive name

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrdersList(response.data.data);
    } else {
      toast.error('Error fetching orders');
    }
  };

  const updateOrderStatus = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="order-container">  {/* Use the refactored class name */}
      <h3>Order Page</h3>
      <div className="order-list">
        {ordersList.map((order, index) => (
          <div key={index} className="order-container">  {/* Use the refactored class name */}
            <img src={require("../../assets/assets/parcel_icon.png")} alt="" /> {/* Use require for local images */}
            <div className="order-details">
              <p className="order-details-food">  {/* More descriptive class name */}
                {order.items.map((item, index) => (
                  <span key={index}>
                    {index === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity},`}
                  </span>
                ))}
              </p>
              <p className="order-name">{order.address.firstName} {order.address.lastName}</p>
              <div className="order-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-phone">{order.address.phone}</p>
            </div>
