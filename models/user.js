const mongoose = require("mongoose");

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "editor"] }
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;