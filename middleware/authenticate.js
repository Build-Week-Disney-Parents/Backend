const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (error, token) => {
      if (error) {
        next({ status: 401, message: "Invalid credentials" });
      } else {
        // Store token in request for use later
        req.token = token;
        next();
      }
    });
  } else {
    next({ status: 401, message: "Please provide a token for authentication" });
  }
};
