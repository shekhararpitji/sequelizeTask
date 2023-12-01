const {
  loginService,
  registerService,
  listService,
} = require("../services/user.services");
const { client } = require("../config/redis.config");
const { User } = require("../models");
const { validateToken, createToken } = require("../utils/authUtil");
const { emails } = require("../utils/emailUtil");

exports.registerCtrl = async (req, res) => {
  try {
    await registerService(req,res);
    await emails({
      to:req.body.email,
      link:"",
      message:"registered successfully",
      subject:"User registration"
    })
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

exports.forgotPassword=async(req,res)=>{
  try {
    const email=req.body.email;
    const existingUser = await User.findOne({where:{email}})
    if(!existingUser) return res.status(403).send({message:"user not found"})
    const newToken = createToken(existingUser);
    await emails({
      to:req.body.email,
      link:`http://localhost/user/reset-password/${newToken}`,
      message:"token for forgot password",
      subject:"Forgot Password"
    })
    res.status(201).send({message:"new token genrated successfully", token:newToken})
  } catch (error) {
console.error(error.message)  }
}

exports.resetToken=async(req,res)=>{
    const token=req.params.token;
    const payload = await JWT.verify(token, process.env.SECRET);
return res.status(200).send({payload,token})
  }
