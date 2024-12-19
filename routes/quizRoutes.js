const express = require("express");

const { getAllQuestions, createQuestion, answeringQuestion, ansAllQuestions  } = require("../controller/quizController");
const { authenticateJWT, checkRole } = require("../config/authMiddleware");


const router = express.Router();

// Routes
router.get("/", authenticateJWT, checkRole(['user', 'admin']), getAllQuestions);
router.post("/", authenticateJWT, checkRole(['admin']), createQuestion);
router.post("/ans", authenticateJWT, checkRole(['user', 'admin']), answeringQuestion);
router.post("/all", authenticateJWT, checkRole(['user', 'admin']), ansAllQuestions);

module.exports = router;
