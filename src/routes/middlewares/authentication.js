"use strict";

const env = require("../../env");
var { expressjwt } = require("express-jwt");

const authentication = expressjwt({
  secret: env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: true,
});

module.exports = authentication;
