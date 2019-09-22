const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const createToken = require("../middleware/token.js");

router.post(
  "/register",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username must be provided"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password must be provided")
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      const newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 12)
      };

      User.create(newUser).then(user => res.status(201).json(user));
    }
  }
);

router.post(
  "/login",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username must be provided"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password must be provided")
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    } else {
      User.getByName(req.body.username).then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          token = createToken(user);
          res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      });
    }
  }
);

module.exports = router;
