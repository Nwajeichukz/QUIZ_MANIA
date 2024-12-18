const express = require("express");

const { getAllQuestions, createQuestion  } = require("../controller/quizController");
const { authenticateJWT, checkRole } = require("../config/authMiddleware");


const router = express.Router();

// Routes
router.get("/", authenticateJWT, checkRole(['user','admin']), getAllQuestions);
router.post("/", authenticateJWT, checkRole(['admin']), createQuestion);

module.exports = router;
