const router = require("express").Router();
const { checkSchema } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const checkValidation = require("../middleware/validation.js");
const createToken = require("../middleware/token.js");

const userSchema = {
  username: {
    in: ["body"],
    isEmpty: false,
    errorMessage: "Username must be provided"
  },
  password: {
    in: ["body"],
    isEmpty: false,
    isLength: {
      options: { min: 4 },
      errorMessage: "Password must be at least 4 characters long"
    }
  }
};

router.post(
  "/register",
  checkSchema(userSchema),
  checkValidation,
  (req, res) => {
    const newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 12)
    };

    User.create(newUser).then(user => {
      const token = createToken(user);
      res.status(201).json({ token });
    });
  }
);

router.post(
  "/login",
  checkSchema(userSchema),
  checkValidation,
  (req, res, next) => {
    User.getByName(req.body.username)
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          token = createToken(user);
          res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => next(error));
  }
);

module.exports = router;
