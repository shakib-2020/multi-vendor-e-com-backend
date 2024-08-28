import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Db Connected Succefully!`);
  } catch (error) {
    console.log("Db connection faild!!");
  }
};
