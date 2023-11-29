const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { User} = require("../models");
const bcrypt = require("bcryptjs");
const randtoken = require("rand-token");
const { client } = require("../config/redis.config");
const itemsPerPage = require("../constants/constant");

exports.loginService = async (req) => {
    const { username } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "username not found" });
  }

  const access_token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET,
    { expiresIn: "15m" }
  );
  let refreshToken = randtoken.uid(256);
  await client.set(refreshToken, username);
  return { access_token, refreshToken };
};

exports.registerService = async (req) => {

  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      console.error("error in validation");
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password, email, firstName, lastName } = req.body;
    const salt = 10;
    const hashpassword = await bcrypt.hash(password, salt);

    await User.create({
      userName,
      password: hashpassword,
      email,
      firstName,
      lastName,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.listService = async (req) => {
  const page = parseInt(req.params.page);
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  const data = await User.findAll();
  const printUsers = data.slice(startIndex, endIndex);
  return printUsers;
};

