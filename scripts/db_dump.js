#!/usr/bin/env node

"use strict";

const env = require("../src/env");

const { dumpDb } = require("./common");

dumpDb()
  .then(() => console.log(`✅ Successfully dumped database ${env.DB_NAME}`))
  .catch((err) => console.error(`❌ Failed dumping database due to:`, err));
