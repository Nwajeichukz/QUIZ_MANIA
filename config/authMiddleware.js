const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config(); // Load environment variables

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user; // Attach user data to request
    next();
  });
};

// Middleware to check roles
const checkRole = (roles) => {
  return async (req, res, next) => {
    // from the jwt payload
    const nameFromReq = req.user.name || {};   
    
    if (!nameFromReq) {
        return res.status(403).json({ message: "Access forbidden: User not found in token" });
      }

    const userDetails = await User.findOne({ name: nameFromReq });

    if (!userDetails || !roles.includes(userDetails.role)) {
      return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }

    next(); // Proceed if role matches
  };
};

module.exports = { authenticateJWT, checkRole };
