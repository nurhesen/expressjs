"use strict";

const app = require("./app");
const env = require("./env");
const routes = require("./routes");

app.use(routes);

app.listen(env.APP_PORT);
