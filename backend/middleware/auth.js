const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "No authorization header" });
  }
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    console.log("No token found in authorization header");
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }
    
    console.log("Token verified successfully, user:", decoded);
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;