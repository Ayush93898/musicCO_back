// Middleware is a gatekeeper 🚪, If middleware says ❌ → request stops,If middleware says ✅ → controller runs
const jwt = require("jsonwebtoken");

const authArtist = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role != "artist") {
      return res.status(403).json({
        message: "You dont have access",
      });
    }

    req.user = decoded; // aytach user to request
    next(); // go to controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// another middleware for authentication... for getting all the musics
const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role != "user"){
      res.status(401).json({
      message: "u dont hve access",
    });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {authArtist, authUser};
