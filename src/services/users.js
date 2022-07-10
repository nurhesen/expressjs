"use strict";

const { Op } = require("sequelize");
const User = require("../models/user");

const registerUser = async (data) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: data.email },
        { username: data.username },
        { id: data.id },
      ],
    },
  });
  if (user != null) {
    return null;
  } else {
    const newUser = User.build(data);

    return newUser.save();
  }
};

module.exports = { registerUser };
