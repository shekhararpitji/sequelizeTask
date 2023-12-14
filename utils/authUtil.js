const JWT = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = JWT.sign(payload, process.env.SECRET, { expiresIn: "15m" });
  return token;
};

const validateToken = async (req) => {
  const token = req.get("authorization").split(" ")[1];
  const payload = await JWT.verify(token, process.env.SECRET);
  return payload;
};

module.exports = {
  createToken,
  validateToken,
};
