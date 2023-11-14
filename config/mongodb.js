// dependencies
import mongoose from "mongoose";

// connect and export
export const mongoDBConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/instagram");
    console.log(`MongoDB Connected`.bgGreen);
  } catch (error) {
    console.log(`Database Connection error!`);
  }
};
