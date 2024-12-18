const QuestionModel = require("../models/question");

const getAllQuestions = async (req, res) => {  
    try {
      const questions = await QuestionModel.find({}, "question options");

      res.status(200).json(questions);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}


const createQuestion = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

   // Validate request data
   if (!question || !options || !correctAnswer) {
    return res.status(400).json({ message: "question, options, and correctAnswer are required" });
  }

  try {
    const newQuestion = new QuestionModel({ question, options, correctAnswer});

    const savedQuestion = await newQuestion.save();
  
    res.status(201).json({ message: "your question has been created successfully"});

  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }


}

module.exports = {
    getAllQuestions,
    createQuestion
  };