import Stripe from 'stripe';
import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place user order from frontend
const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const frontendUrl = 'http://localhost:5174'; // Assuming fixed URL for simplicity

  try {
    const newOrder = new OrderModel({ userId, items, amount, address });
    await newOrder.save();

    // Clear user cart
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 200 * 80, // Delivery fee (2 * 0.8 * 100 cents)
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error placing order' });
  }
};

// Verify order payment status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === 'true') {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Paid' });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'Not Paid' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error verifying order' });
  }
};

// Get user orders for frontend
const userOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await OrderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching user orders' });
  }
};

// Get all orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching orders' });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating order status' });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
