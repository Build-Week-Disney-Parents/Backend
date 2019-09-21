const jwt = require("jsonwebtoken");

module.exports = function(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "30d"
  };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};
