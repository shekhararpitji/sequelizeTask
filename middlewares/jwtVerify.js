const jwt = require("jsonwebtoken");

exports.authMiddle = async (req, res, next) => {
    try {
      const access_token = req.get("authorization").split(" ")[1];
     
      const decoded = jwt.verify(access_token, process.env.SECRET);
      if (decoded.userId) {
        req.userId=decoded.userId;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  };