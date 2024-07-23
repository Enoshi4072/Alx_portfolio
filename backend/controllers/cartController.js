import { UserModel } from '../models/userModel.js'; // Assuming UserModel export

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const { cartData } = user;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await user.updateOne({ cartData });
    res.json({ success: true, message: 'Added To Cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding to cart' });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const { cartData } = user;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await user.updateOne({ cartData });
    res.json({ success: true, message: 'Removed From Cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing from cart' });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const { cartData } = user;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching cart data' });
  }
};

export { addToCart, removeFromCart, getCart };
