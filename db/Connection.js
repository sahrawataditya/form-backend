import mongoose from "mongoose";
import { MONGO_URL } from "../config/lib.js";

export async function connectDb() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("We're Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
