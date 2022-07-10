"use strict";

const { Sequelize, ValidationError } = require("sequelize");
module.exports = (err, req, res, next) => {
  let errorResponse = {
    message: err.message,
    status: err.status ?? 500,
  };
  if (err.status === 400 || err.isJoi || err instanceof ValidationError) {
    errorResponse = handleBadRequest(err);
  } else if (err.status === 401) {
    errorResponse.message = "Not Authenticated";
  } else if (err.status === 403) {
    errorResponse.message = "Forbidden";
  } else if (err.status === 404) {
    errorResponse.message = "Not Found";
  } else if (err.status === 405) {
    errorResponse.message = "Method Not Allowed";
  } else if (err.status === 409) {
    errorResponse.message = "Conflict";
  }
  return res.status(errorResponse.status).send(errorResponse);
};

const buildErrorMessages = (err, mapKey, key, value) => {
  return err[mapKey].map((error) => {
    const e = {};
    e[error[key]] = error[value].toString().replaceAll('"', "");
    return e;
  });
};

const handleBadRequest = (err) => {
  const errorResponse = {
    message: "",
    status: 400,
  };
  if (err.isJoi) {
    errorResponse.message = "Validation error";
    errorResponse.messages = buildErrorMessages(
      err,
      "details",
      "path",
      "message"
    );
  } else if (err instanceof Sequelize.ValidationError) {
    errorResponse.message = "Validation error";
    errorResponse.messages = buildErrorMessages(
      err,
      "errors",
      "path",
      "message"
    );
  }
  return errorResponse;
};
