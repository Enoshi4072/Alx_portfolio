import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../src/Context/Context";
import { API_URL, userToken } from "../../src/constants"; // Assuming these are defined elsewhere

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    if (!userToken) return; // Handle no token scenario

    const response = await axios.post(`${API_URL}/api/order/userorders`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    setOrders(response.data.data);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []); // Fetch on component mount

  const displayOrderItems = (items) => (
    <p>
      {items.map((item, index) => (
        <span key={index}>
          {item.name} x {item.quantity}
          {index === items.length - 1 ? "" : ", "}
        </span>
      ))}
    </p>
  );

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            {displayOrderItems(order.items)}
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchUserOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
