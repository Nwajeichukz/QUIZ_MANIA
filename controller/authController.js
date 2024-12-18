const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


const getUsers = async (req, res) => {
  try {
    const data = await UserModel.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const { name, password, age, role } = req.body;

  // Validate request data
  if (!name || !password || !age) {
    return res.status(400).json({ message: "Name, password, and age are required" });
  }

  const allowedRoles = ["user", "admin", "editor"]; // Define allowed roles
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  try {
    const saltRounds = 10; 
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Assign a default role if none provided
    const userRole = role || "user";

    const newUser = new UserModel({ name, password: hashedPassword,  age, role: userRole });

    const savedUser = await newUser.save();
    
    res.status(201).json({ message: `${name} your account has been created successfully`});
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Name must be unique" });
    } else {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const loginUser = (req, res, ) => {

  const payload = {
    id: req.user.id,
    name: req.user.name
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

  try {
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser
};