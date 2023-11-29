const { User, Address, Token } = require("../models");
const { Op } = require("sequelize");


exports.addressService = async (req) => {
    try {
      const access_token = req.get("authorization").split(" ")[1];
      
      const { address, state, pin_code, phone_no } = req.body;
      const Creator = Address.belongsTo(User, { as: "addresses" });
      const newAddress = await Address.create(
        {
          userId: userToken.userId,
          address,
          state,
          pin_code,
          phone_no,
        },
        {
          include: [Creator],
        }
      );
      return newAddress;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  exports.addressListService = async (req) => {
    const userId = req.params.id;
  
    const address = await User.findAll({
      where: { id: userId },
      include: Address,
    });
    return address;
  };
  
  exports.deleteAddressService = async (req) => {
    const addressIds = req.body.addressIds;
    if (!addressIds || !Array.isArray(addressIds)) {
      return res.status(400).json({ error: "Invalid request format" });
    }
  
    await Address.destroy({
      where: {
        id: {
          [Op.in]: addressIds,
        },
      },
    });
  };
  