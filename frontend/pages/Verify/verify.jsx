import React, { useContext, useEffect } from 'react';
import './Verification.css'; // Renamed CSS file for variety
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../src/Context/StoreContext'; // Renamed context path
import axios from 'axios';

const PaymentVerification = () => {
  const [queryParams] = useSearchParams();
  const isSuccess = queryParams.get("success");
  const orderID = queryParams.get("orderId");
  const navigate = useNavigate();
  const { apiUrl } = useContext(StoreContext);

  const verifyTransaction = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/order/verify`, { success: isSuccess, orderId: orderID });
      if (response.data.success) {
        navigate("/orders");
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Verification failed:", error);
      navigate('/');
    }
  };

  useEffect(() => {
    verifyTransaction();
  }, [apiUrl, isSuccess, orderID, navigate]);

  return (
    <div className='verification-container'>
      <div className="verification-spinner"></div>
    </div>
  );
};

export default PaymentVerification;
