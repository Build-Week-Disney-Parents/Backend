const { validationResult } = require("express-validator");

module.exports = function(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    next({ status: 400, message: errors.array() });
  }
};
