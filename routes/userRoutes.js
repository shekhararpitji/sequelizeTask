const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const userController = require("../controllers/userController");

const router = express.Router();

router.put("/delete", jwtVerify.authMiddle, userController.deleteCtrl);

router.get("/get", jwtVerify.authMiddle, userController.getAllCtrl);

router.get("/list/:page", jwtVerify.authMiddle, userController.listController);

router.post("/refresh", userController.refresh);

router.post("/login", userController.loginCtrl);

router.post("/register", userController.registerCtrl);

module.exports = router;
