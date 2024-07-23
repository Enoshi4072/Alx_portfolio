import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Added unique constraint for name
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const Food = mongoose.model("Food", foodSchema); // Use clear model name

export default Food;
