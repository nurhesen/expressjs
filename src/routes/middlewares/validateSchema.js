"use strict";

module.exports = (schema) => (req, res, next) => {
  schema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(next);
};
