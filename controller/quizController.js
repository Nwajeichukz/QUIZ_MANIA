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

const answeringQuestion = async (req, res) => {
  const { id, correctAnswer } = req.body;

  
  try{
    if (!id || !correctAnswer) {
      return res.status(400).json({ message: "ID and correctAnswer are required" });
    }

    const questionById = await QuestionModel.findById(id);

    if (!questionById) {
      return res.status(404).json({ message: "Question not found" });
    }


    if(questionById.correctAnswer === correctAnswer){
      res.status(201).json({ message: "correct option"})
    }else{
      res.status(201).json({ message: "wrong option"})
    }
  }catch(error){
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal Server Error" });

  }

}

//MAKE A METHOD TO ANSWER ALL QUESTION
const ansAllQuestions = async (req, res) => {
  let num = 0;

  try{
    
  const listOfAnswersAndId = req.body;

  const questions = await QuestionModel.find();

  const map = new Map(questions.map(q => [q.id, q.correctAnswer]));

  for (let  { id, correctAnswer } of listOfAnswersAndId) {    
    const answerFromDb = map.get(id);

    if(answerFromDb?.toLowerCase() === correctAnswer?.toLowerCase()) num ++; 
  }


  res.status(201).json({ message: `here is your total score ${num}`})

  }catch(error){
    console.error("Error answering question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

module.exports = {
    getAllQuestions,
    createQuestion,
    answeringQuestion,
    ansAllQuestions
};