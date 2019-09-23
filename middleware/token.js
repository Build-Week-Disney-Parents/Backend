const jwt = require("jsonwebtoken");

module.exports = function(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "30d"
  };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};
