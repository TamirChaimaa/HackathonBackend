// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// ✅ Load environment variables from .env
require("dotenv").config();

// ✅ Use the variables from process.env
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_NAME = process.env.CLUSTER_NAME;
const APP_NAME = process.env.APP_NAME;

// ✅ Build the MongoDB URI
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}/${DB_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

