const express = require("express");
const dotenv = require("dotenv");

const session = require("express-session");
const passport = require("passport");


const userRoutes = require("./routes/authRoutes");

const app = express();
dotenv.config();

// Middleware to parse JSON data in the request body
app.use(express.json());
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/auth", userRoutes);

module.exports = app;
