const express = require("express");
const passport = require("passport");

const { getUsers, createUser, loginUser } = require("../controller/authController");

const router = express.Router();

// Routes
router.get("/", getUsers);
router.post("/create", createUser);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(401).json({ message: info ? info.message : "Unauthorized" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      loginUser(req, res); // Call the loginUser function to handle token creation
    });
  })(req, res, next);
});

module.exports = router;