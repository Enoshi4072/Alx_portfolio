import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: mongoose.Schema.Types.Mixed, default: {} }, // Use Mixed type for flexibility
}, { timestamps: true }); // Add timestamps for automatic creation and update tracking

const User = mongoose.model("User", userSchema); // Use clear model name

export default User;
