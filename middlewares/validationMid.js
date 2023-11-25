const { body } = require("express-validator");
const User = require("../models/user");

const isUsernameUnique = async (username) => {
  const isUserPresent = await User.findOne({where:{ username: username }});
  if (isUserPresent !== null) {
    res.send("username already existt");
    return true;
  }

  return false;
};
const isEmailUnique = async (email) => {
  const isUserPresent = await User.findOne({where:{ email: email }});
  if (isUserPresent !== null) {
    res.send("user already present");
    return true;
  }

  return false;
};
exports.redgMiddle = [
  body("username")
    .custom(isUsernameUnique)
    .withMessage("Username is already taken")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  body("email")
    .custom(isEmailUnique)
    .withMessage("Email is already registered")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];



exports.loginMiddle = [
  body("username").notEmpty(),
  body("password").notEmpty(),
];
