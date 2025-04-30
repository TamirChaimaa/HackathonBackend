// Import the Mongoose library to define a schema and model
const mongoose = require("mongoose");

// Define the schema for a User document in MongoDB
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model called "users" based on the UserSchema
const UserModel = mongoose.model("users", UserSchema);

// Export the model so it can be used in controllers and routes
module.exports = UserModel;
