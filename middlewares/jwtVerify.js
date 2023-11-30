const jwt = require("jsonwebtoken");
const { validateToken } = require("../utils/authUtil");

exports.authMiddle = async (req, res, next) => {
  try {
    const decoded =await validateToken(req);
    if (decoded.id) {
      req.userId = decoded.id;
      req.username = decoded.username;
      req.email = decoded.email;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
