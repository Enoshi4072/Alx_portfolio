import React, { useContext } from "react";
import "./CartStyles.css";
import { StoreContext } from "../../src/Context/StoreContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cartItems, foodList, removeItemFromCart, calculateTotalAmount, apiUrl } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="shopping-cart">
      <div className="cart-contents">
        <div className="cart-header">
          <p>Item</p>
          <p>Description</p>
          <p>Unit Price</p>
          <p>Qty</p>
          <p>Subtotal</p>
          <p>Action</p>
        </div>
        <hr className="divider" />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-item">
                  <img src={`${apiUrl}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p>
                    <button onClick={() => removeItemFromCart(item._id)} className="remove-button">
                      x
                    </button>
                  </p>
                </div>
                <hr className="divider" />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-summary">
        <div className="summary-details">
          <h2>Order Summary</h2>
          <div>
            <div className="summary-item">
              <p>Subtotal:</p>
              <p>${calculateTotalAmount().toFixed(2)}</p>
            </div>
            <hr className="divider" />
            <div className="summary-item">
              <p>Delivery Fee:</p>
              <p>${calculateTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="divider" />
            <div className="summary-item">
              <b>Total:</b>
              <b>${calculateTotalAmount() === 0 ? 0 : calculateTotalAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")} className="checkout-button">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="promo-code-section">
          <p>Have a promo code? Enter it below:</p>
          <div className="promo-input-group">
            <input type="text" placeholder="Enter promo code" className="promo-input" />
            <button className="apply-button">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
