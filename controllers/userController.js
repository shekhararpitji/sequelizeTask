const {
  loginService,
  registerService,
  listService,
} = require("../services/user.services");
const { client } = require("../config/redis.config");
const { User } = require("../models");
const { validateToken } = require("../utils/authUtil");

exports.registerCtrl = async (req, res) => {
  try {
    await registerService(req);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.loginCtrl = async (req, res) => {
  try {
    const { access_token, refreshToken } = await loginService(req, res);
    res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true });
    res.status(200).json({ jwt: access_token, refreshToken: refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getAllCtrl = async (req, res) => {
  try {
    const user = await User.findAll({ include: "addresses" });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.listController = async (req, res) => {
  try {
    const printUsers = await listService(req);
    res.status(200).json({ users: printUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteCtrl = async (req, res) => {
  try {
    const access_token =await validateToken(req);
    const user = await User.destroy({ where: { id: access_token.id } });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const value = await client.get(refreshToken);

    res.status(200).send({ value });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ message: "invalid refreshToken" });
  }
};
