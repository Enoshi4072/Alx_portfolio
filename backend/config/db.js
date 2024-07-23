import mongoose from "mongoose";

export const connectDB =async () => {
    await mongoose.connect('mongodb+srv://enokib9428:Enoshi1877@cluster0.tdnx3er.mongodb.net/food-del').then(()=>console.log('DB connected'));
}