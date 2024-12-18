const mongoose = require("mongoose");

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    question: { type: String, required: true},
    options: { type: [String], required: true }, // Array of strings
    correctAnswer: { type: String, required: true },
});

const QuestionModel = mongoose.model("questions", userSchema);

module.exports = QuestionModel;