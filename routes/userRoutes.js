const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.registerCtrl);

router.post("/login", userController.loginCtrl);

router.get("/get", jwtVerify.authMiddle, userController.getAllCtrl);

router.get("/list/:page", jwtVerify.authMiddle, userController.listController);

router.put("/delete", jwtVerify.authMiddle, userController.deleteCtrl);

router.post("/refresh", userController.refresh);

router.use("/address", require("./addressRoutes"));

router.use("/forgot-password", userController.forgotPassword);

module.exports = router;
