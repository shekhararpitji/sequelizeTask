const express = require("express");
const jwtVerify = require("../middlewares/jwtVerify");
const userController = require("../controllers/addressController");


const router = express.Router();

router.post("/new", jwtVerify.authMiddle, userController.addressController);

router.delete("/delete",jwtVerify.authMiddle,userController.deleteAddressController);

router.get("/get/:id",jwtVerify.authMiddle,userController.addressListController);

module.exports = router;
