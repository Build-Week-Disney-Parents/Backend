const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (error, token) => {
      if (error) {
        res.status(401).json({ error: "Invalid credentials" });
        next();
      } else {
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ error: "Please provide a token for authentication" });
    next();
  }
};
