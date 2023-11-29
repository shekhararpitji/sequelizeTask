const {
  addressService,
  deleteAddressService,
  addressListService,
} = require("../services/address.services");

exports.addressController = async (req, res) => {
  try {
    const address = await addressService(req);

    res.status(200).json({ message: "Address saved", data: address });
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Address");
  }
};

exports.addressListController = async (req, res) => {
  try {
    const address =await addressListService(req);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

exports.deleteAddressController = async (req, res) => {
  try {
    await deleteAddressService(req);
    res.json({ message: "Addresses deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
