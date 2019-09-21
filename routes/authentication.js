const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const createToken = require("../middleware/token.js");

const router = require("express").Router();

router.post("/register", (req, res, next) => {
  if (req.body.username && req.body.password) {
    const newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 12)
    };

    User.create(newUser)
      .then(user => res.status(201).json(user))
      .catch(error => {
        next("Unable to create user");
      });
  } else {
    next("Please provide username and password");
  }
});

router.post("/login", (req, res, next) => {
  User.getByName(req.body.username)
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        token = createToken(user);
        res.json({ message: `Welcome, ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => next("Unable to login user"));
});

module.exports = router;
