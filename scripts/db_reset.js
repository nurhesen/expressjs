#!/usr/bin/env node

"use strict";

const env = require("../src/env");

const { resetDb } = require("./common");

resetDb()
  .then(() => console.log(`✅ Successfully reset database ${env.DB_NAME}`))
  .catch((err) => console.error(`❌ Failed resetting database due to:`, err));
