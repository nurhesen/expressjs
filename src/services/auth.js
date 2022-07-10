const { generateToken, hashPassword } = require("../utils/auth");
const User = require("../models/user");

exports.login = async ({ email, password }) => {
  const hashedPassword = hashPassword(password);

  const user = await User.findOne({
    where: { email, password: hashedPassword },
  });

  return user
    ? {
        accessToken: generateToken(user),
      }
    : null;
};
