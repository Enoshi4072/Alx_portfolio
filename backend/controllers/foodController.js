import { log } from 'console'; // Assuming console.log is preferred
import FoodModel from '../models/foodModel.js'; // Assuming FoodModel export
import { unlinkSync } from 'fs'; // Use unlinkSync for synchronous deletion

// Add food item
const addFood = async (req, res) => {
  try {
    const { filename } = req.file; // Destructure filename from req.file
    const newFood = new FoodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: filename,
    });

    await newFood.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

// Get all food list
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching food list' });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: 'Food not found' });
    }

    unlinkSync(`uploads/${food.image}`); // Synchronous file deletion
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing food' });
  }
};

export { addFood, listFood, removeFood };
