const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const userController = require("../controllers/addressController");

const router = express.Router();

router.post("/new", jwtVerify.authMiddle, userController.addressController);

router.get("/get/:id",jwtVerify.authMiddle,userController.addressListController);

router.delete("/delete",jwtVerify.authMiddle,userController.deleteAddressController);

module.exports = router;
