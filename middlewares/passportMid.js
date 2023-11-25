const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.passMid = async (username, password, done) => {
  try {
    const user = await User.findOne({where:{ username: username }});

    if (!user) {
      return done(null, false);
    }
    const check = bcrypt.compareSync(password, user.password);
    if (!check) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
