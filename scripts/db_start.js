#!/usr/bin/env node

"use strict";

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { join } = require("path");
const env = require("../src/env");
const {
  DB_DOCKER_CONTAINER,
  DB_DOCKER_IMAGE,
  NETWORK_NAME,
} = require("./docker_config");
const { createNetwork } = require("./common");

const hostRootDir = join(__dirname, "../");
const hostDataDir = join(hostRootDir, "/data");
const hostDbDir = join(hostRootDir, "/db");
const hostScriptsDir = join(hostRootDir, "/scripts");

createNetwork(NETWORK_NAME)
  .then(() =>
    exec(
      `docker run --name ${DB_DOCKER_CONTAINER} -d --rm \
        --network=${NETWORK_NAME} \
        -p ${env.DB_PORT}:3306 \
        -v ${hostDataDir}:/data \
        -v ${hostDbDir}:/var/lib/mysql \
        -v ${hostScriptsDir}:/scripts \
        -e MYSQL_USER=${env.DB_USER} \
        -e MYSQL_PASSWORD=${env.DB_PASSWORD} \
        -e MYSQL_ROOT_PASSWORD=${env.DB_PASSWORD} \
        -e MYSQL_DATABASE=${env.DB_NAME} \
        -e MYSQL_HOST=localhost \
        -e MYSQL_PORT=${env.DB_PORT} \
        --platform=linux/amd64 \
        ${DB_DOCKER_IMAGE} \
        --default_authentication_plugin=mysql_native_password`
    )
  )
  .then(() => console.log(`✅ Successfully started DB container`))
  .catch((err) =>
    console.error(`❌ Failed starting DB container due to:`, err)
  );
