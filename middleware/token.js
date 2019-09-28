const jwt = require("jsonwebtoken");

module.exports = function(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "10d"
  };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};
