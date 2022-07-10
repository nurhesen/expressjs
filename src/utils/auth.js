"use strict";

const { pbkdf2Sync } = require("crypto");
const jwt = require("jsonwebtoken");

const env = require("../env");

const generateToken = ({ id, email, username, firstName, lastName }) =>
  jwt.sign({ id, email, username, firstName, lastName }, env.JWT_SECRET);

const hashPassword = (password) => {
  if (!password) {
    return null;
  }
  const passwordHash = pbkdf2Sync(
    password,
    env.PASSWORD_HASH_SALT,
    100000,
    64,
    "sha512"
  );
  return passwordHash.toString("hex");
};

module.exports = { generateToken, hashPassword };
