"use strict";

module.exports = (param) => (req, res, next) => {
  if (req.params[param] !== req.body.id) {
    return next({
      status: 400,
      message: `Request content ${req.body.id} does not match route`,
    });
  }
  return next();
};
