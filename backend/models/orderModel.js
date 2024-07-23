import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference User model using ObjectId
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }], // Reference Food model using ObjectId array
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Processing" }, // Updated default status for clarity
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
})

const Order = mongoose.model("Order", orderSchema); // Use clear model name

export default Order;
