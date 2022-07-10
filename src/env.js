"use strict";

const envalid = require("envalid");

const { num, str, port, bool } = envalid;

require("dotenv").config();

module.exports = envalid.cleanEnv(
  process.env,
  {
    APP_PORT: port({ default: 3000 }),
    CI: bool({ default: false }),
    DB_HOSTNAME: str({ devDefault: "localhost" }),
    DB_NAME: str({ devDefault: "p2p" }),
    DB_PASSWORD: str({ devDefault: "devpass" }),
    DB_PORT: num({ default: 3306 }),
    DB_USER: str({ devDefault: "devuser" }),
    JWT_SECRET: str({ devDefault: "p2p" }),
    PASSWORD_HASH_SALT: str({ devDefault: "e6d94a35eb122f760b681429fd0065ce" }),
  },
  {
    strict: true,
  }
);
